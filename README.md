# Atlas Systems

Landing page institucional bilíngue da Atlas Systems, criada em HTML, CSS e JavaScript sem dependências de produção.

## Executar localmente

Na raiz do projeto:

```bash
python3 -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## Principais recursos

- Hero WebGL 2 com objeto 3D refrativo, resposta ao ponteiro e transformação na rolagem.
- Conteúdo em português do Brasil e inglês, com preferência de idioma persistida no navegador.
- Acordeão de serviços, processo interativo, blocos de resultados e microinterações.
- Layout responsivo e suporte a `prefers-reduced-motion`.
- Contato direto por WhatsApp com mensagem bilíngue pré-preenchida.

## Estrutura

- `index.html`: conteúdo e semântica.
- `styles.css`: identidade visual, layout e animações.
- `hero3d.js`: renderização WebGL do hero.
- `app.js`: idioma e interações da página.
