<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Usuario extends Authenticatable
{
    use HasFactory, HasApiTokens;

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
