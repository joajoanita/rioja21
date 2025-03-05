<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Empresa;

use Illuminate\Http\Request;
use Validator;

class AdminEmpresaController extends Controller
{

    public function createEmpresa(Request $r)
    {
        $validator = Validator::make($r->all(), [
            'name' => 'required|string|max:50',
            'description' => 'required|string|max:500'
        ]);

        if ($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        try {
            $empresa = Empresa::create([
                'name' => $r->name,
                'description' => $r->description,
            ]);
        } catch (\Exception $e){
            return response()->json(['message' => 'No se ha podido crear la empresa', 'error' => $e->getMessage()], 500);
        }

        return response()->json(['message' => 'Empresa creada con éxito', 'Empresa' => $empresa], 200);
    }

    public function updateEmpresa($id, Request $r)
    {
        $empresa = Empresa::find($id);

        if (!$empresa){
            return response()->json(['error' => 'Esa empresa no existe'], 404);
        }

        try {
            $empresa->name = $r->name;
            $empresa->description = $r->description;
            $empresa->update();

        } catch (\Exception $e){
            return response()->json(['message' => 'No se ha podido modificar la empresa' , 'error' => $e->getMessage()],500);
        }

        return response()->json(['message' => 'La empresa '.$empresa->name.' ha sido modificada con éxito'], 200);
    }

    public function deleteEmpresa($id,Request $r)
    {
        $empresa = Empresa::find($id);

        if (!$empresa){
            return response()->json(['error' => 'No se puede eliminar la empresa porque no existe'], 404);
        }

        $empresa->delete();
        return response()->json(['message' => 'La empresa '.$empresa->name.' ha sido eliminada con éxito'], 200);
    }
}
