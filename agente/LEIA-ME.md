# Agente do site (gerado pelo agent-generator)

Esta pasta é servida pelo site. Para ligar o agente: Cole antes de </body> em cada página (ou no index.html do React/Vue/Vite):

Cole antes de </body> em cada página (ou no index.html do React/Vue/Vite):
<link rel="stylesheet" href="/agente/widget.css">
<script type="module" src="/agente/widget.js"></script>

## O que editar
- conhecimento/agente.json: nome, cor (#hex), saudação, textos fixos e sugestões iniciais.
- conhecimento/faq.json: perguntas e respostas. Use "termos" para sinônimos.
- conhecimento/intencoes.json: frases de exemplo e respostas (saudação, contato, ajuda...).
- conhecimento/paginas.json: páginas do site e os termos que levam a cada uma.
- conhecimento/catalogo.json: itens (ou "url" da API do site que lista os itens).

Depois de editar, confira com: npx agent-generator avaliar <pasta-do-projeto>

## Não editar
- nucleo/ e widget.* são atualizados pelo agent-generator (comando instalar).

Endereço público desta pasta: /agente/
