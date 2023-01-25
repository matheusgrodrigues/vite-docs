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
