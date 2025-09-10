<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbHistorico', function (Blueprint $table) {
            $table->id();
            $table->string('valor');
            $table->string('tipo');
            $table->string('motivo');
            $table->timestamp('data')->useCurrent();
            $table->unsignedBigInteger('idUsuario');
    
            $table->foreign('idUsuario')->references('id')->on('tbUsuario')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbHistorico');
    }
};
