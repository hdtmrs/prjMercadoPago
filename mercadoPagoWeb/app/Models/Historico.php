<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Usuario;

class Historico extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'tbHistorico';


    protected $fillable = [
        'id',
        'valor',
        'data',
        'tipo',
        'motivo',
        'idUsuario',
    ];

    public function usuario() {
        return $this->belongsTo(Usuario::class, 'id');
    }
}


