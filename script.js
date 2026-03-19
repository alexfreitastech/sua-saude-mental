function mostrarAba(indice) {
  document.querySelectorAll('.conteudo-aba').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

  const aba = document.getElementById(`conteudo-${indice}`);
  if (aba) aba.classList.add('active');

  document.querySelectorAll(`.nav-btn[data-index="${indice}"]`).forEach(btn => btn.classList.add('active'));

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

function updateProgress() {
  let respondidas = 0;
  const total = 20;

  for (let i = 1; i <= total; i++) {
    if (document.querySelector(`input[name="q${i}"]:checked`)) {
      respondidas++;
    }
  }

  const pct = Math.round((respondidas / total) * 100);
  const bar = document.getElementById('progressBar');
  const label = document.getElementById('progressLabel');

  if (bar) bar.style.setProperty('--progress', pct + '%');
  if (label) label.textContent = `${respondidas} de ${total} respondidas`;

  document.querySelectorAll('.question').forEach((q, idx) => {
    const qNum = idx + 1;
    const checked = document.querySelector(`input[name="q${qNum}"]:checked`);
    if (checked) q.classList.add('respondida');
  });
}

function calcularResultado() {
  let totalPontos = 0;
  let naoRespondidas = [];

  for (let i = 1; i <= 20; i++) {
    const resposta = document.querySelector(`input[name="q${i}"]:checked`);
    if (resposta) {
      totalPontos += parseInt(resposta.value);
    } else {
      naoRespondidas.push(i);
    }
  }

  if (naoRespondidas.length > 0) {
    const primeiraFaltando = document.querySelector(`[data-q="${naoRespondidas[0]}"]`);
    if (primeiraFaltando) {
      primeiraFaltando.scrollIntoView({ behavior: 'smooth', block: 'center' });
      primeiraFaltando.style.borderColor = '#e07d9a';
      primeiraFaltando.style.boxShadow = '0 0 0 3px rgba(224,125,154,0.2)';
      setTimeout(() => {
        primeiraFaltando.style.borderColor = '';
        primeiraFaltando.style.boxShadow = '';
      }, 2000);
    }

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        <span style="font-size:1.5rem;">⚠️</span>
        <div>
          <h3 style="margin-bottom:4px;">Atenção</h3>
          <p>Você ainda não respondeu ${naoRespondidas.length} pergunta(s). Por favor, responda todas antes de ver o resultado.</p>
        </div>
      </div>`;
    resultadoDiv.className = 'resultado-card nivel-medio';
    resultadoDiv.style.display = 'block';
    resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  let nivel, titulo, emoji, descricao, dica;

  if (totalPontos <= 27) {
    nivel = 'nivel-baixo';
    titulo = 'Bem-estar Positivo';
    emoji = '🌟';
    descricao = 'Você está em um momento emocional positivo e consegue lidar bem com os desafios do dia a dia. Seu equilíbrio emocional está saudável.';
    dica = 'Aproveite essa fase para fortalecer seu bem-estar: mantenha hábitos saudáveis, cultive seus relacionamentos e continue se cuidando.';
  } else if (totalPontos <= 42) {
    nivel = 'nivel-medio';
    titulo = 'Atenção Moderada';
    emoji = '🌤️';
    descricao = 'Embora você esteja bem na maior parte do tempo, alguns sinais de desconforto emocional podem estar surgindo.';
    dica = 'Preste atenção nas suas emoções e invista em autocuidado. Conversar com alguém de confiança pode ajudar a aliviar o peso emocional.';
  } else if (totalPontos <= 58) {
    nivel = 'nivel-alto';
    titulo = 'Atenção Necessária';
    emoji = '🌧️';
    descricao = 'Você pode estar enfrentando desafios emocionais que estão afetando sua disposição, humor e qualidade de vida.';
    dica = 'É importante buscar apoio. Converse com alguém de confiança ou considere consultar um psicólogo. Você não precisa passar por isso sozinho(a).';
  } else {
    nivel = 'nivel-severo';
    titulo = 'Busque Ajuda';
    emoji = '💙';
    descricao = 'Sua saúde mental pode estar precisando de atenção especializada. Os sinais indicam um nível elevado de sofrimento emocional.';
    dica = 'Por favor, busque apoio profissional. Ligue para o CVV (188) se precisar conversar agora. Você importa e merece ajuda.';
  }

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
    <div style="margin-bottom:8px;font-size:2.5rem;">${emoji}</div>
    <div class="nivel-badge" style="background:${getBadgeColor(nivel)};color:white;">${titulo}</div>
    <h3>${titulo}</h3>
    <p style="margin-bottom:16px;">${descricao}</p>
    <p style="padding:16px;background:rgba(0,0,0,0.05);border-radius:12px;font-size:0.93rem;"><strong>💡 O que fazer:</strong> ${dica}</p>
    ${nivel === 'nivel-severo' || nivel === 'nivel-alto' ? `
    <div style="margin-top:16px;padding:14px 20px;background:rgba(255,255,255,0.6);border-radius:12px;display:flex;align-items:center;gap:12px;">
      <span style="font-size:1.5rem;">📞</span>
      <div style="font-size:0.9rem;">
        <strong>CVV — Centro de Valorização da Vida</strong><br>
        Ligue <strong>188</strong> — gratuito, 24 horas, todos os dias.
      </div>
    </div>` : ''}
    <p style="margin-top:20px;font-size:0.78rem;color:#5a6c7a;font-style:italic;">⚠️ Este questionário é uma ferramenta de autoavaliação e não substitui a avaliação de um profissional de saúde mental.</p>
  `;

  resultadoDiv.className = `resultado-card ${nivel}`;
  resultadoDiv.style.display = 'block';
  resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getBadgeColor(nivel) {
  const cores = {
    'nivel-baixo':  '#5bc4a0',
    'nivel-medio':  '#e8a354',
    'nivel-alto':   '#e07d9a',
    'nivel-severo': '#e07a7a',
  };
  return cores[nivel] || '#3b9ec4';
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarAba(0);
});