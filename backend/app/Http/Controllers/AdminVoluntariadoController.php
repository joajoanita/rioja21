<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use App\Models\User;
use App\Models\Voluntariado;
use Validator;
use Illuminate\Http\Request;

class AdminVoluntariadoController extends Controller
{
    /*
     * 1. Añadir ofertas de voluntariado DONE
     * 2. Eliminar ofertas de voluntariado DONE
     * 3. Modificar ofertas de voluntariado DONE
     * 4. Ver TODOS los voluntariados
     * 5. Ver las personas en cada voluntariado
     */

    public function indexUsuariosEnVoluntariados()
    {

        $voluntariado = Voluntariado::with('usuarios')->get()->flatMap(function ($voluntariado) {
            return $voluntariado->usuarios->map(function($usuario) {
                return $usuario->pivot;
            });
        });


        return response()->json($voluntariado->values()->toArray());

    }

    public function createVoluntariado(Request $r)
    {
        $validator = Validator::make($r->all(), [
            'city' => 'required|string|max:50',
            'description' => 'required|string|max:2050',
            'id_empresa' => 'required|integer'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try {
            $empresa = Empresa::find($r->id_empresa);
            if($empresa){
                $voluntariado = Voluntariado::create([
                    'city' => $r->city,
                    'description' => $r->description,
                    'id_empresa' => $empresa->id,
                ]);
            } else {
                return response()->json(['message' => 'No existe la empresa'], 503);
            }


        } catch (\Exception $e){
            return response()->json(['message' => 'No se ha podido crear el voluntariado', 'error' => $e->getMessage()], 500);
        }
        return response()->json(['message' => 'El voluntariado se ha creado con éxito', 'Voluntariado' => $voluntariado], 200);
    }

    public function updateVoluntariado($id, Request $r)
    {
        $voluntariado = Voluntariado::find($id);

        if (!$voluntariado){
            return response()->json(['error' => 'No se ha encontrado el voluntariado especificado'], 404);
        }

        try {
            $empresa = Empresa::find($r->id_empresa);
            $empresaId = $empresa->id;

            $voluntariado->city = $r->city;
            $voluntariado->description = $r->description;
            $voluntariado->id_empresa = $empresaId;
            $voluntariado->update();

        } catch (\Exception $e) {
            return response()->json(['message' => 'No se ha podido modificar el voluntariado', 'error' => $e->getMessage()], 500);
        }
        return response()->json(['message' => 'El voluntariado de '.$voluntariado->city.' ha sido modificado con éxito'], 200);
    }

    public function deleteVoluntariado($id, Request $r)
    {
        $voluntariado = Voluntariado::find($id);

        if (!$voluntariado){
            return response()->json(['error' => 'No se ha encontrado el voluntariado especificado'], 404);
        }

        $voluntariado->delete();
        return response()->json(['message' => 'El voluntariado de '.$voluntariado->city.' ha sido eliminado con éxito'], 200);
    }
}
