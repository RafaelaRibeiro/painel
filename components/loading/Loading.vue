<template>
  <div class="loading">
    <!-- Adicione aqui o conteúdo da sua tela de carregamento -->
    <div class="spinner"></div>
    <p>Carregando...</p>
  </div>
</template>

<style>
.loading {
  /* Adicione estilos CSS para posicionar a tela de carregamento no centro da página */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.spinner {
  /* Adicione estilos CSS para o spinner de carregamento */
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
