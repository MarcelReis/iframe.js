Esse é um rascunho da implementação do proxy player com o EventEmitter. Utilizei o mesmo EventEmitter presente no site.

**iframe.js** - entry point do iframe. implementa api do youtube e controla vídeo e se comunica com o `window.parent`.

**proxy.js** - faz o meio de campo: embeda o iframe, escuta os eventos da ui e envia para o iframe, escuta os eventos do iframe e envia para a ui. retorna uma instância do proxy. (útil para usar no blog onde tem vários vídeos na mesma página)

**player.js** - implementa a ui do player. ouve intereções do user e dispara eventos para o proxy.

Testando
- `npm i`
- `npm run dev`
- abrir player.html

To Do:
- receber parâmetro pela url (ou pelo init)
- reaproveitar iframe do youtube para tocar próxima música
- passar o `targetOrigin` correto para manter a segurança
- evitar memory leak limpando eventos do window ao destruir o player  (implementar o destroy)
- o proxy ao ouvir as mensagens do window não faz de qual instância o evento pertence (passar um id da instância?)
