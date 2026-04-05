function mostrarAba(numero) {
  const secoes = document.querySelectorAll('section[id^="secao-"]');
  secoes.forEach(secao => {
    secao.style.display = 'none';
  });

  const secaoAtiva = document.getElementById('secao-' + numero);
  if (secaoAtiva) {
    secaoAtiva.style.display = 'block';
  }

  const botoes = document.querySelectorAll('.nav-btn');
  botoes.forEach(botao => {
    botao.classList.remove('active');
  });

  const botaoAtivo = document.querySelector('[data-secao="' + numero + '"]');
  if (botaoAtivo) {
    botaoAtivo.classList.add('active');
  }

  window.scrollTo(0, 0);
}

function abrirMenu() {
  const menu = document.getElementById('menuMobile');
  if (menu.style.display === 'none' || menu.style.display === '') {
    menu.style.display = 'flex';
  } else {
    menu.style.display = 'none';
  }
}

function fecharMenu() {
  document.getElementById('menuMobile').style.display = 'none';
}

function atualizarProgresso() {
  let respondidas = 0;
  const total = 10;

  for (let i = 1; i <= total; i++) {
    const resposta = document.querySelector('input[name="pergunta' + i + '"]:checked');
    if (resposta) {
      respondidas = respondidas + 1;
    }
  }

  const percentual = Math.round((respondidas / total) * 100);
  const barra = document.getElementById('progressBar');
  const texto = document.getElementById('progressLabel');

  barra.style.width = percentual + '%';
  texto.textContent = respondidas + ' de ' + total + ' respondidas';
}

function calcularResultado() {
  let pontos = 0;
  let naoRespondidas = 0;

  for (let i = 1; i <= 10; i++) {
    const resposta = document.querySelector('input[name="pergunta' + i + '"]:checked');
    if (resposta) {
      const valor = resposta.value;
      if (valor === '4') {
        pontos = pontos + 4;
      } else if (valor === '3') {
        pontos = pontos + 3;
      } else if (valor === '2') {
        pontos = pontos + 2;
      } else if (valor === '1') {
        pontos = pontos + 1;
      }
    } else {
      naoRespondidas = naoRespondidas + 1;
    }
  }

  if (naoRespondidas > 0) {
    alert('Você ainda não respondeu ' + naoRespondidas + ' pergunta(s). Por favor, responda todas!');
    return;
  }

  let titulo = '';
  let descricao = '';
  let dica = '';
  let classe = '';
  let emoji = '';

  if (pontos <= 13) {
    titulo = 'Bem-estar Positivo';
    descricao = 'Você está em um momento emocional positivo e consegue lidar bem com os desafios do dia a dia.';
    dica = 'Mantenha hábitos saudáveis e continue se cuidando.';
    classe = 'nivel-baixo';
    emoji = '🌟';
  } else if (pontos <= 20) {
    titulo = 'Atenção Moderada';
    descricao = 'Embora você esteja bem na maior parte do tempo, alguns sinais de desconforto podem estar surgindo.';
    dica = 'Preste atenção nas suas emoções e invista em autocuidado.';
    classe = 'nivel-medio';
    emoji = '🌤️';
  } else if (pontos <= 28) {
    titulo = 'Atenção Necessária';
    descricao = 'Você pode estar enfrentando desafios emocionais que estão afetando sua disposição e qualidade de vida.';
    dica = 'Converse com alguém de confiança ou considere consultar um psicólogo.';
    classe = 'nivel-alto';
    emoji = '🌧️';
  } else {
    titulo = 'Busque Ajuda';
    descricao = 'Sua saúde mental pode estar precisando de atenção especializada. Os sinais indicam um nível elevado de sofrimento.';
    dica = 'Por favor, busque apoio profissional. Ligue para o CVV (188).';
    classe = 'nivel-severo';
    emoji = '💙';
  }

  const resultado = document.getElementById('resultado');
  let html = '';
  
  html = html + '<div style="font-size: 40px; margin-bottom: 16px;">' + emoji + '</div>';
  html = html + '<div class="nivel-badge" style="background: ' + obterCorBadge(classe) + '; color: white;">' + titulo + '</div>';
  html = html + '<h3>' + titulo + '</h3>';
  html = html + '<p>' + descricao + '</p>';
  html = html + '<p style="padding: 16px; background: rgba(0,0,0,0.05); border-radius: 12px; margin-top: 16px;">';
  html = html + '<strong>💡 O que fazer:</strong> ' + dica;
  html = html + '</p>';
  
  if (classe === 'nivel-severo' || classe === 'nivel-alto') {
    html = html + '<div style="margin-top: 16px; padding: 14px 20px; background: rgba(255,255,255,0.6); border-radius: 12px; display: flex; align-items: center; gap: 12px;">';
    html = html + '<span style="font-size: 24px;">📞</span>';
    html = html + '<div style="font-size: 14px;">';
    html = html + '<strong>CVV — Centro de Valorização da Vida</strong><br>';
    html = html + 'Ligue <strong>188</strong> — Gratuito, 24 horas';
    html = html + '</div>';
    html = html + '</div>';
  }

  resultado.innerHTML = html;
  resultado.className = 'resultado-card ' + classe;
  resultado.style.display = 'block';

  setTimeout(function() {
    resultado.scrollIntoView({behavior: 'smooth'});
  }, 100);
}

function obterCorBadge(nivel) {
  if (nivel === 'nivel-baixo') {
    return '#5bc4a0';
  } else if (nivel === 'nivel-medio') {
    return '#e8a354';
  } else if (nivel === 'nivel-alto') {
    return '#e07d9a';
  } else if (nivel === 'nivel-severo') {
    return '#e07a7a';
  } else {
    return '#3b9ec4';
  }
}

window.addEventListener('load', function() {
  mostrarAba(0);
});
