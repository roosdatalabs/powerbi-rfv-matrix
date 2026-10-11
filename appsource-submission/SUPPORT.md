# Suporte e Termos de Uso — Matriz RFV / RFM (Roos Data Labs)

**Desenvolvedor**: Roos Data Labs  
**E-mail de Suporte**: [paulo@roosdatalabs.com](mailto:paulo@roosdatalabs.com)  
**Website**: [https://roosdatalabs.com](https://roosdatalabs.com)  
**Documentação / GitHub**: [https://github.com/roosdatalabs/powerbi-rfv-matrix](https://github.com/roosdatalabs/powerbi-rfv-matrix)

---

## 1. Canais de Atendimento ao Cliente

Usuários e organizações que utilizam o visual **Matriz RFV / RFM** dispõem dos seguintes canais para suporte:
- **Suporte Técnico por E-mail**: Envie suas dúvidas ou relatórios de incidentes para [paulo@roosdatalabs.com](mailto:paulo@roosdatalabs.com) com o assunto `[Suporte Matriz RFV]`.
- **Rastreador de Problemas (GitHub Issues)**: Relate bugs ou solicite melhorias diretamente no repositório oficial do projeto.
- **SLA de Resposta**: Nosso tempo médio de primeira resposta para dúvidas técnicas é de até **24 a 48 horas úteis**.

---

## 2. Requisitos Mínimos do Sistema

- **Microsoft Power BI Desktop**: Versão de Setembro de 2023 ou superior (compatível com Power BI Visuals API v5.11+).
- **Microsoft Power BI Service**: Qualquer plano corporativo (Pro, Premium por Usuário ou Capacidade Fabric).
- **Navegadores Homologados**: Microsoft Edge (Chromium), Google Chrome, Mozilla Firefox e Safari.

---

## 3. Guia Rápido de Resolução de Dúvidas

1. **O visual está em branco?**
   - Certifique-se de que os 3 campos obrigatórios estão preenchidos: **Recência (1 a 5)**, **Freq / Monetário (1 a 5)** e **Quantidade de Clientes** (medida ou contagem).
2. **Como alterar o idioma dos quadrantes?**
   - Acesse o painel de Formatação do visual > seção **Quadrantes** > opção **Idioma dos Rótulos** e escolha entre *Português (pt-BR)*, *English (en-US)* ou *Español (es-ES)*.
3. **Como ativar múltiplos pequenos (Small Multiples)?**
   - Arraste uma coluna categórica (ex.: *Segmento de Clientes*, *Canal de Vendas*, *Região*) para o campo **Múltiplos Pequenos**. O visual dividirá o espaço automaticamente em cards individuais com proporção uniforme.
4. **Como usar o Modo Foco em Múltiplos Pequenos?**
   - Passe o cursor sobre o card desejado e clique no botão **Focar** (ou no título do card). O bloco selecionado se expandirá cobrindo 100% da área do visual. Para retornar à grade completa, clique no botão **← Voltar aos blocos** ou pressione a tecla `Esc`.
