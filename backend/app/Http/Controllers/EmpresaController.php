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
}
