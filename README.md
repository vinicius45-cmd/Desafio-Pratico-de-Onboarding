# 🏛️ Documentação de Padronização Front-End — SEMOB

> **SECRETARIA DE ESTADO DE MOBILIDADE DO DISTRITO FEDERAL (SEMOB)**  
> **Data:** 2026

Este documento define a arquitetura oficial, tecnologias e padrões de codificação para os projetos front-end da SEMOB. O objetivo principal é garantir manutenibilidade, escalabilidade e a correta integração multiplataforma (Web, PWA e Mobile).

---

## 📑 Sumário
1. [Padrão de Arquitetura e Tecnologias](#1-padrão-de-arquitetura-e-tecnologias---front-end-web-e-mobile)
2. [Estrutura de Diretórios e Responsabilidades](#2-estrutura-de-diretórios-e-responsabilidades)
3. [Arquitetura em Camadas (Fluxo de Dados)](#3-arquitetura-em-camadas-fluxo-de-dados)
4. [Diretrizes de Desenvolvimento Mobile (Capacitor)](#4-diretrizes-de-desenvolvimento-mobile-capacitor)
5. [Variáveis de Ambiente (.env)](#5-variáveis-de-ambiente-env)
6. [Fluxo de Trabalho e Versionamento](#6-fluxo-de-trabalho-e-versionamento-repositório-semobgitlab)
7. [Guia de Comandos Locais](#7-guia-de-comandos-locais)

---

## 1. 🛠️ Padrão de Arquitetura e Tecnologias - Front-End Web e Mobile

A stack tecnológica foi rigorosamente definida para manter consistência e alta performance nos projetos da secretaria.

| Tecnologia | Padrão Adotado | Versão Recomendada / Compatível | Descrição e Justificativa |
| :--- | :--- | :--- | :--- |
| **Framework Base** | **React.js** | `^18.3.x` | Biblioteca robusta e padronizada para interfaces. |
| **Build Tool** | **Vite** | `^5.4.x` | Garante builds rápidos e otimizados na fase de desenvolvimento e produção. |
| **Linguagem Mobile** | **Java (JDK)** | `21` (LTS) | Obrigatório para o ambiente de build do APK Android nativo. |
| **Empacotador Nativo**| **Capacitor** | `^6.0.x` | Padrão único para empacotamento nativo Mobile. |
| **PWA** | **vite-plugin-pwa** | `^0.20.x` | Obrigatório para conversão de web apps em Progressive Web Apps. |
| **Gerenciador de Pacotes**| **npm** | `10.x` (Node `v20.x` LTS) | Manter consistência de dependências no projeto. |
| **Comunicação HTTP** | **Axios** | `^1.6.x` | Facilita a interceptação global de requisições e tratamento centralizado de erros. |
| **Estado Global** | **Zustand / Context API** | `^4.5.x` (Zustand) | Para injeção de provedores e gerenciamento de estados complexos compartilhados. |

---

## 2. 📂 Estrutura de Diretórios e Responsabilidades

A arquitetura do projeto deve seguir estritamente a divisão abaixo dentro da pasta `src/`:

```text
src/
├── app/          # Centralizador principal da aplicação. Rotas globais, provedores e entrada raiz.
├── assets/       # Imagens, Ícones e Styles globais.
├── components/   # Componentes de UI reutilizáveis, genéricos e isolados (ex: botões, modais).
├── config/       # Configurações do Capacitor (permissões, plugins nativos) e Instâncias Base.
├── context/      # Gerenciamento de estado global da aplicação (dados do usuário logado, tema).
├── core/         # Adaptadores e interceptores de API padronizados.
├── hooks/        # Lógica de negócio e gerenciamento de estado das telas.
├── screens/      # Telas (Views). Componentes "limpos" focados 90% na renderização.
├── services/     # Camada exclusiva de comunicação externa separada por domínio/API.
├── types/        # Tipagens estáticas. Exportadas e centralizadas num único arquivo (types/index.ts).
└── utils/        # Formatadores (CPF, Datas) e validadores genéricos.
```

---

## 3. 🏗️ Arquitetura em Camadas (Fluxo de Dados)

Nossa arquitetura prioriza a separação de responsabilidades. O arquivo da tela em `/screens` deve importar seu respectivo hook para obter os dados e as funções necessárias, mantendo o JSX limpo.

1. **Screen (`/screens`)**: Exibe os componentes. Componentes muito específicos de uma tela devem ser acoplados ao hook daquela tela.
2. **Hook (`/hooks`)**: É invocado pela Screen. Concentra toda a lógica e regras de tela.
3. **Service (`/services`)**: É invocado pelo Hook. Cada arquivo aqui é separado por domínio (ex: `authService.ts`). Nenhuma View acessa a API diretamente.
4. **Tipagem (`/types`)**: Tudo trafegado entre Front e Back deve ser estritamente tipado. Proibido o uso de `any`.

> 💡 **Regra Prática:** Se um Componente Visual/Screen possui mais de 50 linhas apenas de lógica e estados, essa lógica deve ser extraída para um Hook customizado.

---

## 4. 📱 Diretrizes de Desenvolvimento Mobile (Capacitor)

- **Encapsulamento:** Toda integração nativa deve ser feita estritamente via plugins do Capacitor e encapsulada na pasta `/config`.
- **Java Obrigatório:** O build Android exige que o ambiente local e as pipelines utilizem **Java 21**.
- **Comunicação HTTP (Android):** Para permitir requisições não-HTTPS (quando estritamente necessário em ambientes de desenvolvimento ou redes internas), o arquivo `android/app/src/main/AndroidManifest.xml` deve conter a seguinte propriedade na tag `<application>`:
  ```xml
  <application
      android:usesCleartextTraffic="true"
      ... >
  ```

---

## 5. 🔐 Variáveis de Ambiente (.env)

- **Nunca chumbar em código:** Sempre centralizar URLs de APIs ou chaves de acesso.
- **Centralização Global:** Todos os links de API e configurações sensíveis devem residir no arquivo `.env` global.
- **Prefixo do Vite:** As variáveis expostas obrigatoriamente devem usar o prefixo `VITE_` (ex: `VITE_API_URL`).

---

## 6. 🔄 Fluxo de Trabalho e Versionamento (Repositório SEMOB/GitLab)

- **Vínculo Oficial:** Todo projeto local deve estar obrigatoriamente linkado ao repositório GitLab da SEMOB.
- **Evite Código Retido:** Se possível, faça o `commit` e o `push` das alterações em andamento para a branch remota antes da saída do prédio. O código não deve ficar retido apenas na máquina local ao fim do expediente.
- **Qualidade dos Commits:** Os commits devem ser descritivos, atômicos e limpos. 
  > 🚫 **Atenção:** Bagunça no histórico ("commit de teste", "ajustes", "asdasd"). Descreva o que foi alterado ou qual funcionalidade foi implementada de forma clara.

---

## 7. 💻 Guia de Comandos Locais

Este guia lista os comandos essenciais para rodar, compilar e empacotar a aplicação nas diversas plataformas.

### 7.1 Setup e Desenvolvimento Web

- **Instalar dependências:**
  ```bash
  npm install
  ```
- **Rodar o servidor de desenvolvimento (Vite):**
  ```bash
  npm run dev
  ```
- **Gerar o build de produção (Web/PWA):**
  ```bash
  npm run build
  ```

### 7.2 Fluxo Mobile (Capacitor)

> ⚠️ **Nota Importante:** Sempre rode o comando de build do Vite antes de sincronizar o Capacitor para garantir que as atualizações cheguem no nativo.

- **Sincronizar código web gerado com o projeto nativo:**
  ```bash
  npx cap sync
  ```
- **Atualizar dependências de plugins do Capacitor:**
  ```bash
  npx cap update
  ```
- **Abrir o projeto no Android Studio (opcional, para debug avançado):**
  ```bash
  npx cap open android
  ```

### 7.3 Build e Execução Android (Via Terminal)

Para executar esses comandos, certifique-se de estar dentro da pasta `android/` gerada pelo Capacitor e de que o seu `JAVA_HOME` aponta para o Java 21.

- **Entrar na pasta nativa:**
  ```bash
  cd android
  ```
- **Limpar o projeto Gradle:**
  ```bash
  ./gradlew clean
  ```
- **Gerar o APK de Debug (para testes locais):**
  ```bash
  ./gradlew assembleDebug
  ```
  *(O APK será gerado em: `android/app/build/outputs/apk/debug/app-debug.apk`)*

- **Gerar o APK/Bundle de Release (publicação oficial):**
  ```bash
  ./gradlew assembleRelease
  # ou
  ./gradlew bundleRelease
  ```
- **Rodar diretamente no emulador ou dispositivo físico conectado (via ADB):**
  *(Execute fora da pasta android)*
  ```bash
  npx cap run android
  ```
