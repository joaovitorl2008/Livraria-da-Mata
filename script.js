// ========================================================
// LIVRARIA DA MATA - SCRIPT DE INTERATIVIDADE COMPLETO
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Janela Modal Personalizada (Livraria DaMata) criada via DOM puro
  const criarModal = () => {
    if (document.getElementById('modal-livraria')) return;

    const overlay = document.createElement('div');
    overlay.id = 'modal-livraria';
    overlay.style.cssText = 'display:none; position:fixed; z-index:9999; left:0; top:0; width:100%; height:100%; background:rgba(0,0,0,0.6); align-items:center; justify-content:center;';

    const caixa = document.createElement('div');
    caixa.style.cssText = 'background:#ffffff; width:90%; max-width:420px; border-radius:8px; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.3); font-family:sans-serif;';

    const topo = document.createElement('div');
    topo.style.cssText = 'background:#4a2c1d; color:#ffffff; padding:12px 16px; font-weight:bold; font-size:16px; display:flex; justify-content:space-between; align-items:center;';
    topo.innerHTML = '<span>Livraria DaMata</span><span id="fechar-modal-x" style="cursor:pointer; font-size:20px;">&times;</span>';

    const corpo = document.createElement('div');
    corpo.id = 'modal-livraria-texto';
    corpo.style.cssText = 'padding:20px; color:#333333; font-size:14px; line-height:1.5; white-space:pre-line;';

    const rodape = document.createElement('div');
    rodape.style.cssText = 'padding:10px 16px 16px; text-align:right; background:#f9f9f9;';
    
    const btnOk = document.createElement('button');
    btnOk.id = 'modal-livraria-ok';
    btnOk.textContent = 'OK';
    btnOk.style.cssText = 'background:#4a2c1d; color:#ffffff; border:none; padding:8px 22px; border-radius:4px; cursor:pointer; font-weight:bold;';

    rodape.appendChild(btnOk);
    caixa.appendChild(topo);
    caixa.appendChild(corpo);
    caixa.appendChild(rodape);
    overlay.appendChild(caixa);
    document.body.appendChild(overlay);

    const fechar = () => {
      overlay.style.display = 'none';
    };

    topo.querySelector('#fechar-modal-x')?.addEventListener('click', fechar);
    btnOk.addEventListener('click', fechar);
  };

  criarModal();

  // Função auxiliar para exibir notificações personalizadas
  const alertaLivraria = (mensagem) => {
    criarModal();
    const texto = document.getElementById('modal-livraria-texto');
    const modal = document.getElementById('modal-livraria');
    if (texto && modal) {
      texto.textContent = mensagem;
      modal.style.display = 'flex';
    }
  };

  // 2. Data Atual nos Rodapés
  document.querySelectorAll('#data-atual').forEach(el => {
    el.textContent = new Date().toLocaleDateString('pt-BR');
  });

  // 3. Status do Usuário no Cabeçalho e Logout
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  document.querySelectorAll('#nome-usuario-logado').forEach(el => {
    if (usuarioLogado) {
      el.innerHTML = ` Olá, <strong>${usuarioLogado}</strong> (<a href="#" id="btn-logout" style="color:#f2a97e">Sair</a>)`;
      document.getElementById('btn-logout')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('usuarioLogado');
        alertaLivraria('Sessão encerrada com sucesso!');
        setTimeout(() => location.reload(), 1200);
      });
    } else {
      el.textContent = 'Visitante';
    }
  });

  // 4. Menus Suspensos / Dropdowns de Cabeçalho
  const toggleMenu = (btnId, menuId, outroMenuId) => {
    document.getElementById(btnId)?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      document.getElementById(outroMenuId)?.classList.remove('mostrar');
      document.getElementById(menuId)?.classList.toggle('mostrar');
    });
  };
  toggleMenu('btn-sobre', 'menu-vertical-sobre', 'menu-vertical-contato');
  toggleMenu('btn-contato', 'menu-vertical-contato', 'menu-vertical-sobre');

  document.addEventListener('click', () => {
    document.querySelectorAll('.menu-vertical').forEach(m => m.classList.remove('mostrar'));
  });

  // 5. Sublinks do Menu (Empresa, Clientes, Telefone e E-mail)
  document.getElementById('sublink-empresa')?.addEventListener('click', (e) => {
    e.preventDefault();
    alertaLivraria(' LIVRARIA DAMATA - EMPRESA\n\nCNPJ: 45.678.910/0001-23\nFundadores: João Oliveira e Henrique da Mata\nSede: Av. das Academias, 1000 - São Paulo/SP\nMissão: Democratizar o acesso à leitura e livros acadêmicos.');
  });

  document.getElementById('sublink-clientes')?.addEventListener('click', (e) => {
    e.preventDefault();
    alertaLivraria(' NOSSA COMUNIDADE (CLIENTES)\n\n• +2.800 Estudantes Cadastrados\n• +4.200 Livros Trocados e Doados\n• 18 Universidades Parceiras');
  });

  document.getElementById('sublink-telefone')?.addEventListener('click', (e) => {
    e.preventDefault();
    alertaLivraria(' TELEFONE DE CONTATO\n\nCentral: (11) 3456-7890\nWhatsApp: (11) 98765-4321\nHorário: Segunda a Sexta, das 08h às 20h');
  });

  document.getElementById('sublink-email')?.addEventListener('click', (e) => {
    e.preventDefault();
    alertaLivraria('✉️ E-MAIL DE CONTATO\n\nSuporte: contato@livrariadamata.com.br\nAtendimento: atendimento@livrariadamata.com.br');
  });

  // 6. Máscara Automática de CPF (Somente números e formato 000.000.000-00)
  const inputCPF = document.getElementById('cpf');
  if (inputCPF) {
    inputCPF.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      e.target.value = value;
    });
  }

  // 7. Formulário de Cadastro -> Registra no localStorage e gera TXT
  document.getElementById('formCadastro')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const end = document.getElementById('endereco').value.trim();
    const email = document.getElementById('email').value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]');
    const jaExiste = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());

    if (jaExiste) {
      alertaLivraria(' Este e-mail já está cadastrado. Por favor, faça login.');
      return;
    }

    usuarios.push({ nome, cpf, end, email });
    localStorage.setItem('usuariosCadastrados', JSON.stringify(usuarios));
    localStorage.setItem('usuarioLogado', nome);

    salvarTXT(`cadastro_${nome.toLowerCase().replace(/\s+/g, '_')}.txt`, `COMPROVANTE DE CADASTRO\nData: ${new Date().toLocaleString('pt-BR')}\nNome: ${nome}\nCPF: ${cpf}\nEndereço: ${end}\nE-mail: ${email}`);

    alertaLivraria(` Cadastro realizado com sucesso! Bem-vindo(a), ${nome}.`);
    setTimeout(() => location.href = 'sebo.html', 1500);
  });

  // 8. Formulário de Login -> Valida usuário existente no localStorage
  document.getElementById('formLogin')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const usuarios = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]');
    const usuarioEncontrado = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!usuarioEncontrado) {
      alertaLivraria('❌ Usuário não cadastrado! Por favor, realize o cadastro antes de entrar.');
      return;
    }

    const nomeUsuario = usuarioEncontrado.nome;
    localStorage.setItem('usuarioLogado', nomeUsuario);

    salvarTXT(`login_${nomeUsuario.toLowerCase().replace(/\s+/g, '_')}.txt`, `COMPROVANTE DE LOGIN\nData: ${new Date().toLocaleString('pt-BR')}\nUsuário: ${nomeUsuario}\nE-mail: ${email}`);

    alertaLivraria(`🔑 Login realizado com sucesso! Olá, ${nomeUsuario}.`);
    setTimeout(() => location.href = 'sebo.html', 1500);
  });

  // 9. Formulário de Anúncio de Livro no Sebo
  const formSebo = document.getElementById('formLivroSebo');
  if (formSebo) {
    formSebo.addEventListener('submit', (e) => {
      e.preventDefault();
      const livro = document.getElementById('nomeLivro').value.trim();
      const autor = document.getElementById('autorLivro').value.trim();
      const estado = document.getElementById('estadoLivro').value;
      const mod = document.getElementById('modalidadeLivro').value;
      const dono = localStorage.getItem('usuarioLogado') || 'Estudante Cadastrado';

      if (!livro || !autor) {
        alertaLivraria('Por favor, preencha o nome e o autor do livro.');
        return;
      }

      salvarTXT(`anuncio_${livro.toLowerCase().replace(/\s+/g, '_')}.txt`, `COMPROVANTE DE ANÚNCIO DE LIVRO\nData: ${new Date().toLocaleString('pt-BR')}\nLivro: ${livro}\nAutor: ${autor}\nEstado: ${estado}\nModalidade: ${mod}\nAnunciante: ${dono}`);

      const container = document.getElementById('containerLivrosSebo') || document.querySelector('main');
      if (container) {
        const art = document.createElement('article');
        art.className = 'card-livro';
        const textoBotao = mod === 'Doação' ? 'Tenho Interesse' : 'Propor Troca';
        art.innerHTML = `<h3>${livro}</h3><ul><li><strong>Área / Gênero:</strong> Didático / Geral</li><li><strong>Modalidade:</strong> ${mod}</li><li><strong>Autor:</strong> ${autor}</li><li><strong>Estado:</strong> ${estado}</li><li><strong>Dono(a):</strong> ${dono}</li></ul><button type="button">${textoBotao}</button>`;
        container.prepend(art);
        configurarBotaoLivro(art.querySelector('button'));
      }

      alertaLivraria(` O livro "${livro}" foi publicado no Sebo! Comprovante TXT baixado.`);
      formSebo.reset();
    });
  }

  // 10. Ação para Todos os Botões de Livro ("Propor Troca" / "Tenho Interesse")
  function configurarBotaoLivro(botao) {
    if (!botao) return;

    botao.addEventListener('click', (e) => {
      const btn = e.currentTarget;
      const artigo = btn.closest('article');
      
      const tituloLivro = artigo?.querySelector('h3')?.textContent || 'Livro';
      const acaoTexto = btn.textContent.trim();
      
      let usuario = localStorage.getItem('usuarioLogado');
      if (!usuario) {
        usuario = prompt('Você precisa estar logado para solicitar este livro. Digite seu nome:', 'Estudante');
      }

      if (!usuario) return;

      const agora = new Date().toLocaleString('pt-BR');
      const nomeArquivo = `solicitacao_${tituloLivro.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.txt`;
      const conteudoTXT = `================================================\nCOMPROVANTE DE REQUISIÇÃO DE LIVRO\nLIVRARIA DAMATA\n================================================\nData: ${agora}\nLivro: ${tituloLivro}\nAção: ${acaoTexto}\nSolicitante: ${usuario}\n\nINSTRUÇÕES:\nApresente este comprovante no balcão da sede (Av. das Academias, 1000) para retirar o exemplar.\n================================================`;

      salvarTXT(nomeArquivo, conteudoTXT);

      btn.textContent = 'Solicitação Registrada ✓';
      btn.style.backgroundColor = '#6c757d';
      btn.style.cursor = 'not-allowed';
      btn.disabled = true;

      alertaLivraria(`Sua solicitação para "${tituloLivro}" foi registrada com sucesso!\nO comprovante foi baixado em arquivo TXT.`);
    });
  }

  document.querySelectorAll('article button, .btn-interesse, .btn-acao-livro').forEach(configurarBotaoLivro);

  // 11. Botões "Ver Detalhes" na Página Inicial
  document.querySelectorAll('.btn-detalhes').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const artigo = e.target.closest('article');
      const titulo = artigo?.querySelector('h3')?.textContent || 'Livro';
      if (confirm(`Deseja acessar a lista completa do Sebo para interagir com "${titulo}"?`)) {
        location.href = 'sebo.html';
      }
    });
  });
});

// Função para Download do Comprovante TXT
function salvarTXT(nome, conteudo) {
  const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = nome;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}