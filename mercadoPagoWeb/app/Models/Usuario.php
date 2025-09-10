<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Modals\Historico;


class Usuario extends Authenticatable
{
    use HasFactory, HasApiTokens;

    protected $fillable = [
        'nome',
        'email',
        'senha',
        'cpf',
        'dinheiro',
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

    public function historicos() {
        return $this->hasMany(Historico::class, 'idUsuario');
    }
}
