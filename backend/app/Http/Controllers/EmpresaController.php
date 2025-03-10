<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    public function indexEmpresas(){
        $empresas = Empresa::all();
        return response()->json($empresas);
    }

    public function showVoluntariadoByEmpresa(Request $request){

        $request->validate([
            'buscar' => 'required|string'
        ]);

        $empresa = Empresa::where('name', $request->buscar)->first();

        if (!$empresa) {
            return response()->json([
                'message' => 'Empresa no encontrada.'
            ], 404);
        }

        $voluntariado = $empresa->voluntariados;

        return response()->json([
            'empresa' => $empresa->name,
            'voluntariado' => $voluntariado
        ], 200);
    }
}
