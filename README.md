# vite-docs

- [Por que Vite](#por-que-vite)
  - [Os problemas](#os-problemas)

## Por que Vite

### Os problemas

Antes que os módulos ES estivessem disponíveis nos navegadores, os desenvolvedores não tinham mecanismo nativo para criar JavaScript de forma modularizada.
Por esse motivo que estamos acostumados com o conceito de "bundle", utilizando ferramentas que rastream, procesam e concatenam nossos módulos de origem em arquivos que podem ser executados no navegador.

Ao longo do tempo vimos ferramentas como webpack, rollup e parcel, que melhoraram muito a experiência de desenvolvimento para desenvolvedores frontend.

No entento, á medida que criamos aplicativos cada ve mais ambiciosos, a quantidade de JavaScript com que lidamos também está aumentando drasticamente.
Não é incomum que projetos de grande escala contenham milhares de módulos. Com isso:

- Começamos a atingir um gargalo de desempenho para ferramentas baseadas em Javascript.
- Muitas vezes pode levar uma espera excessivament longa (ás vezes até minutos!)
- Alguns segundos para ser refletido no navegador.

Com isso,o ciclo de feedback lento pode afetar muito a produtividade e a felicidade dos desenvolvedores.

O Vite visa resolver esses problemas aproveitando novos avanços no ecossistema:

- A disponibilidade de módulos ES nativos no navegador e o surgimento de ferramentas Javascript escritas em linguagens de compilação nativa.
