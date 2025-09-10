<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HistoricoController;

Route::post('/cadastrar',[UsuarioController::class, 'store']);
Route::post('/entrar',[AuthController::class, 'index']);


Route::middleware('auth:api')->controller(UsuarioController::class)->group(function () {
    Route::get('/getdate','index');
    Route::put('/update-money','put');
});

Route::middleware('auth:api')->controller(HistoricoController::class)->group(function () {
    Route::get('/see','index');
    Route::post('/post','store');
});
