# vite-docs

- [Por que Vite](#por-que-vite)
  - [Os problemas](#os-problemas)
    - [Inicio lendo do servidor](#inicio-lento-do-servidor)
    - [Atualizações lentas](#atualizacoes-lentas)

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

#### Inicio lento do servidor

Ao iniciar um servidor de desenvolvimento com uma configuração baseada em bundler, ele precisará rastrear e compilar avidamente todo o aplicativo antes que ele possa ser servido.

O Vite melhora esse problema de inicio de servidor, dividindo primeiro os módulos em um aplicativo em duas categorias: dependências e código fonte.

- Dependências: Javascript simples que não mudam com frequência durante o desenvolvimento.
- Código fonte: Javascript que precisa ser transformado e será editado com muita frequencia, todo código fonte que precisa ser carregado ao mesmo tempo (import etc...)

O Vite fornece código-fonte sobre o ESM Nativo do browser. Isso basicamente permite que o navegador assuma parte do trabalho de um empacotador O Vite só precisa transformar e servir o código-fonte sob demanda, conforme o navegador o solicita. O Código por trás das importações dinâmicas condifionais só é processado se realmente usado na tela atual.

#### Atualizacoes lentas

Quando um arquivo é editado em uma configuração de compilação baseada em bundles, é ineficienter reconstruir todo o bundle por motivos óbvios: a velocidade de atualização será degradada linearmente com o tamanho do aplicativo.

Em alguns bundlers, o dev server executa o bundle na memória para que ele só precisa invalidar parte de seu gráfico de módulo quando um arquivo for alterado, mas ainda precisa reconstruir todo o bundle e recarregar a página na web. Reconstruir o pacote pode ser caro e recarregar a página acaba com o estado atual do aplicativo.

No Vite, é executado sobre o ESM Nativo. Quando um arquivo é editado, o Vite precisa apenas invalidar precisamente a cadeia ente o módulo editado e o seu HMT mais pŕoximo(Na maioria das vezes apenas o próprio módulo), tornando as atualizações do HMR (Hot Module Replacement) consistentemente rápidas, independentemente do tamanho do seu aplicativo.

OVite também aproveita os cabeçalhos HTTP para acelerar o recarregamento de páginasinteiras (mais um avez, deixe o navegador fazer o maior trabalho para nós): as solicitações do módulo de código-fonte são condicionadas via 304 not modified, e assolicitações do módulo de dependência são fortemente armazenadas em cache por meio de Cache-control: max-age=31536000, immutable para que eles não atinjam o servidor novamente uma vez armazenados em cache.

Depois de experimentar o quão rápido o Vite é, duvidamos que você esteja disposto a tolerar o desenvolvimento empacotado novamente.

## Visao geral

Vite (palavra francesa para "rápido") é uma ferramenta de compilação que visa fornecer uma experiência de desenvolvimento mais rápida e enxuta para projetos da Web modernos. É composto por duas partes funcionais:

- Um servidor de desenvolvimento que fornece aprimoramentos de recursos avançados em módulos ES nativos extremamente rápido, por exemplo, Hot Module Replacement (HMR).
- Um comando de compilação que agrupa seu código com Rollup, pré-configurado para produzir ativos estáticos altamente otimizados para produção.

O Vite é opinativo e vem com padrôes sensatos prontso para uso, mas também é altamente extensível por meio de sua API de plugin e API de Javascript com suporte de digitação completo.

### Suporte do navegador

A compilação padrão destina-se a navegadores que suportem Módulos ES nativos, import dinâmico ESM nativo e import.meta. Os navegadores legadors podem ser suportados por meio do @vitejs/plugin-legacy oficial.

### Criando projeto

O Vite requer o Node.js 14.18+, 16+.

> npm create vite@lates

> yarn create vite

> pnpm create vite

Você também pode especificardiretamente o nome do projeto e o modelo que deseja usar por meio de opções de linha de comando adicionais. Por exemplo, para estruturar um projeto Vite + Vue, execute:

> npm create vite@latest my-vue-app --template vue

> npm create vite@latest my-vue-app -- --template vue

> yarn create vite my-vue-app --template vue

> pnpm create vite my-vue-app --template vue

### Modelos da comunidade

create-vite é uma ferramenta para iniciar rapidamente um projeto a partir de um modelo básico para frameworks populares. Confira Awesome Vite para modelos mantidos pela comunidade que incluem outras ferramentas ou visam diferentes estruturas. Você pode usar uma ferramenta como degit para montar seu projeto com um dos modelos.

### index,html e Raiz do projeto

- index.html é frontal e central em vez de estar escondido dentro de public,
- Isso é intencional: durante o desenvolvimento, o Vite é um servidor e index.html é o ponto de entrada para seu aplicativo.

Semelhante a servidores http estáticos, o Vite tem o conceito de um "diretório raiz" do qual seus arquivos são servidos.

- Você o verá referenciando como `<root>` em todo o resto dos documentos
- URLs absolutas em seu código-fonte serão resolvidas usando a raiz do projeto como base, para que você possa escrever código como se estivesse trabalhando com um servidor de arquivos estático normal.
- O Vite também é capaz de lidar com dependências que resolvem para locais fora da raiz do sistema de arquivos, o que o torna utilizável mesmo em um aconfiguração baseada em monorepo.
- O Vite também suporta aplicativos de várias páginas com varios pontos de entrada .html
