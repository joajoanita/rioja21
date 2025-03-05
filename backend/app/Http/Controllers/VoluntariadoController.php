<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Voluntariado;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Validator;

class VoluntariadoController extends Controller
{
    /*
     * 1. Se mostraran las ofertas disponibles
     * 2. Formualrio para meterse en los voluntariados
     */

    public function indexVoluntariados(Request $r)
    {
        $voluntariados = Voluntariado::busquedaPorVoluntariado($r->buscar);
        return response()->json($voluntariados);
    }

    public function showVoluntariado($id)
    {
        $voluntariado = Voluntariado::find($id);
        if(!$voluntariado){
            return response()->json(['error' => 'Voluntariado no encontrado'], 404);
        }
        return response()->json($voluntariado);
    }

    public function inscribirseEnVoluntariado(Request $r){
        $validator = Validator::make($r->all(),[
            'name' => 'required|string|max:50',
            'email' => 'required|string|email|max:50',
            'voluntariado' => 'required|integer|exists:voluntariados,id',
        ]);

        if ($validator->fails()) {
            return response()->json([$validator->errors()->toJson()], 500);
        }

        try {
                $usuario = User::firstOrCreate([
                    'name' => $r->name,
                    'email' => $r->email,
                    'password' =>'123H$',
                    'rol' => 'usuario'
                ]);

                $voluntariadoId = $r->input('voluntariado');
                $voluntariado = Voluntariado::find($voluntariadoId);

                if (!$voluntariado) {
                    return response()->json(['message' => 'Voluntariado no encontrado'], 404);
                }

                if (!$usuario->voluntariados()->where('id_voluntariado', $voluntariadoId)->exists()) {
                    $usuario->voluntariados()->attach($voluntariadoId, [
                        'fecha' => Carbon::now()->isoFormat('YYYY-MM-DD')
                    ]);
                } else {
                    return response()->json(['message' => 'El usuario ya está inscrito en este voluntariado'], 409);
            }
        } catch (\Exception $e){
            return response()->json(['message' => 'No se ha podido inscribir a '.$r->name.' en el voluntariado', 'error' => $e->getMessage()], 500);
        }
        return response()->json([
            'message' => 'Usuario inscrito en voluntariado', 'usuario' => $usuario->name], 200);
    }

}
