<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'email',
        'senha',
        'cpf',
    ];

    protected $table = 'tbUsuario';

    public $timestamps = true;

    protected $hidden = [
        'senha',
    ];

    protected $casts = [
        'nome' => 'string',
        'email' => 'string',
        'senha' => 'string',
        'cpf' => 'string',
    ];


}
