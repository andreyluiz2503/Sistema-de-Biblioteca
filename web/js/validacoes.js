// Validação para formulários
function validarFormulario(event) {
  const formulario = event.target;
  let camposValidos = true;
  let mensagensErro = [];

  // Validação comum: campos obrigatórios
  formulario.querySelectorAll("input[required], select[required]").forEach((campo) => {
    if (!campo.value.trim()) {
      camposValidos = false;
      mensagensErro.push(`O campo "${campo.previousElementSibling.innerText}" é obrigatório.`);
      campo.classList.add("erro");
    } else {
      campo.classList.remove("erro");
    }
  });

  // Validação de e-mail (em cadastros de usuário, se houver)
  const campoEmail = formulario.querySelector('input[type="email"]');
  if (campoEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campoEmail.value)) {
    camposValidos = false;
    mensagensErro.push("O e-mail inserido é inválido.");
    campoEmail.classList.add("erro");
  }

  // Validação de ano (para cadastro de livros)
  const campoAno = formulario.querySelector('input[name="ano"]');
  if (campoAno && !/^\d{4}$/.test(campoAno.value)) {
    camposValidos = false;
    mensagensErro.push("O ano deve ter 4 dígitos.");
    campoAno.classList.add("erro");
  }

  // Se houver erros, impedir envio
  if (!camposValidos) {
    event.preventDefault();
    alert(mensagensErro.join("\n"));
  }
}

// Adiciona o listener para todos os formulários da página
document.addEventListener("DOMContentLoaded", () => {
  const formularios = document.querySelectorAll("form");
  formularios.forEach((form) => {
    form.addEventListener("submit", validarFormulario);
  });
});
