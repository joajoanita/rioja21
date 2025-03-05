<?php

use App\Http\Controllers\AdminEmpresaController;
use App\Http\Controllers\AdminVoluntariadoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\VoluntariadoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($r){
    Route::post('/login',       [AuthController::class, 'login']);
    Route::post('/register',    [AuthController::class, 'register']);
    Route::get('/userProfile',  [AuthController::class, 'userProfile'])->middleware('auth:api');
    Route::post('/logout',      [AuthController::class, 'logout']);
    Route::post('/refresh',     [AuthController::class, 'refresh']);

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'admin'
], function ($r){
    // Funciones de la empresa
    Route::post('/createEmpresa',       [AdminEmpresaController::class, 'createEmpresa']);
    Route::put('/updateEmpresa/{id}',   [AdminEmpresaController::class, 'updateEmpresa']);
    Route::delete('/deleteEmpresa/{id}',[AdminEmpresaController::class, 'deleteEmpresa']);

    // Funciones del voluntariado
    Route::post('/createVoluntariado',          [AdminVoluntariadoController::class, 'createVoluntariado']);
    Route::put('/updateVoluntariado/{id}',      [AdminVoluntariadoController::class, 'updateVoluntariado']);
    Route::delete('/deleteVoluntariado/{id}',   [AdminVoluntariadoController::class, 'deleteVoluntariado']);
    Route::get('/indexUsuariosEnVoluntariados', [AdminVoluntariadoController::class, 'indexUsuariosEnVoluntariados']);
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'user'
], function ($r){
    Route::get('/indexVoluntariados',           [VoluntariadoController::class, 'indexVoluntariados']);
    Route::post('/inscribirseEnVoluntariado',   [VoluntariadoController::class, 'inscribirseEnVoluntariado']);
    Route::get('/indexEmpresas',                [EmpresaController::class, 'indexEmpresas']);
    Route::get('/detalleVoluntariado/{id}',     [VoluntariadoController::class, 'showVoluntariado']);

});
