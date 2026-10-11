# Política de Privacidade — Matriz RFV / RFM (Roos Data Labs)

**Data da Última Atualização**: 11 de Outubro de 2026  
**Desenvolvedor**: Roos Data Labs (Paulo Roos)  
**Contato**: [paulo@roosdatalabs.com](mailto:paulo@roosdatalabs.com) | [https://roosdatalabs.com](https://roosdatalabs.com)

---

## 1. Visão Geral e Compromisso com a Privacidade

A **Roos Data Labs** desenvolve soluções de inteligência de dados e visuais analíticos customizados para o ecossistema Microsoft Power BI. Esta Política de Privacidade descreve as práticas de tratamento de dados relativas ao suplemento/visual customizado **Matriz RFV / RFM** (`roosRfvMatrixC82A8D124C704536BA3D66733D198070`), disponível no Microsoft AppSource.

---

## 2. Coleta e Transmissão de Dados

- **Zero Coleta Externa**: O visual **não coleta, não armazena, não transmite e não compartilha** quaisquer dados analíticos, credenciais, informações confidenciais ou metadados de relatórios com servidores externos da Roos Data Labs ou com quaisquer terceiros.
- **Processamento 100% Local (Client-Side)**: Todas as agregações, renderizações de gráficos vetoriais (SVG), filtragens cruzadas e cálculos de layout ocorrem exclusivamente na memória local da instância em execução do Microsoft Power BI Desktop ou Power BI Service (Web/Mobile), sob a sessão autenticada do próprio usuário.
- **Isenção de Chamadas de Rede**: O visual não executa requisições HTTP/HTTPS, chamadas AJAX/Fetch, conexões WebSocket, nem carrega bibliotecas ou scripts externos dinamicamente. Todas as dependências necessárias para seu funcionamento estão estritamente contidas no pacote `.pbiviz`.

---

## 3. Armazenamento e Cookies

- O visual **não utiliza cookies**, `localStorage`, `sessionStorage` ou `IndexedDB` para rastreamento ou persistência de dados fora das APIs padrão da Microsoft (Power BI Visuals API).
- As únicas configurações persistidas são as propriedades de formatação do próprio relatório (cores, fontes, idioma dos quadrantes e opacidade), as quais são geridas e criptografadas exclusivamente pela infraestrutura do Microsoft Power BI.

---

## 4. Conformidade e Certificação Microsoft

Este suplemento foi desenvolvido em estrita conformidade com os requisitos de segurança e privacidade do programa **Power BI Certified Visuals**, respeitando as diretrizes de governança corporativa, LGPD (Lei Geral de Proteção de Dados - Brasil) e GDPR (General Data Protection Regulation - União Europeia).

---

## 5. Contato e Suporte

Para dúvidas, solicitações ou suporte técnico relacionado a esta política ou ao funcionamento do visual:
- **E-mail de Suporte**: [paulo@roosdatalabs.com](mailto:paulo@roosdatalabs.com)
- **Website Oficial**: [https://roosdatalabs.com](https://roosdatalabs.com)
- **Repositório e Documentação**: [https://github.com/roosdatalabs/powerbi-rfv-matrix](https://github.com/roosdatalabs/powerbi-rfv-matrix)
