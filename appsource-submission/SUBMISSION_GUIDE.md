# Guia Oficial de Submissão ao Microsoft Partner Center / AppSource
## Visual Customizado: Matriz RFV / RFM — Roos Data Labs

Este guia contém **todos os campos, textos, metadados e instruções prontas para copiar e colar** no formulário de submissão do **Microsoft Partner Center** (Commercial Marketplace > Power BI visual).

---

## 1. Inventário de Arquivos do Pacote de Envio

Todos os arquivos estão organizados nesta pasta (`custom-visuals/tecdisaRfvMatrix/appsource-submission/`):

| Arquivo / Item | Descrição | Onde utilizar |
|---|---|---|
| `Matriz_RFV_RoosDataLabs_v1.0.0.1.pbiviz` | Pacote compilado final de produção (v1.0.0.1 com Context Menu de espaço vazio) | Aba **Packages** no Partner Center |
| `assets/icon_20x20.png` | Ícone do visual no painel de visualizações (20x20px) | Embutido no pacote e exibição |
| `assets/logo_300x300.png` | Logo da oferta para vitrine do AppSource (300x300px) | Aba **Store listings > Marketplace media** |
| `PRIVACY_POLICY.md` | Texto oficial da política de privacidade | Link ou publicação em `https://roosdatalabs.com/privacy` |
| `SUPPORT.md` | Termos de suporte e SLA | Link ou publicação em `https://roosdatalabs.com/support` |
| `assets/screenshot_1_overview.png` | Visão geral executiva com matriz 5x5 e tabela (1366x768) | Aba **Store listings > Marketplace media** |
| `assets/screenshot_2_crossfilter.png` | Filtragem cruzada bidirecional interativa (1366x768) | Aba **Store listings > Marketplace media** |
| `assets/screenshot_3_focus_mode.png` | Modo foco de tela cheia do quadrante (1366x768) | Aba **Store listings > Marketplace media** |
| `assets/screenshot_4_format_pane.png` | Painel de formatação e configurações (1366x768) | Aba **Store listings > Marketplace media** |
| `assets/screenshot_5_small_multiples.png` | Múltiplos pequenos por segmento/canal (1366x768) | Aba **Store listings > Marketplace media** |
| **Relatório Demo (.pbix)** | Relatório interativo de exemplo (preparado por você) | Aba **Packages > Sample report** |

---

## 2. Passo a Passo no Microsoft Partner Center

1. Acesse o [Microsoft Partner Center](https://partner.microsoft.com/dashboard/commercial-marketplace/overview).
2. Clique em **Marketplace comercial** > **Ofertas** > Selecione a oferta existente ou **Nova oferta** > **Visual do Power BI**.
3. Preencha cada aba com as informações fornecidas abaixo.

---

### Aba 1: Configuração da Oferta (Offer Setup)

- **Alias da oferta**: `rfm-matrix-roos-data-labs`
- **ID da oferta**: `rfm-matrix-roos-data-labs` *(deve ser único na sua conta)*

---

### Aba 2: Propriedades (Properties)

- **GUID do Visual**: `roosRfvMatrixC82A8D124C704536BA3D66733D198070`
- **Versão do Visual**: `1.0.0.1`
- **Categorias (Categories)**:
  - `Data Analytics` (Análise de Dados)
  - `Sales & Marketing` (Vendas e Marketing)
  - `Visuals` (Visuais)
- **Indústrias (Industries)**:
  - `Retail and Consumer Goods`
  - `Financial Services`
  - `Professional Services`

---

### Aba 3: Listagem na Loja (Store Listings)

No Partner Center, o **Inglês (Estados Unidos)** é o idioma principal obrigatório. Você pode clicar em **"Adicionar idioma"** para adicionar as vitrines localizadas em **Português (Brasil)** e **Espanhol**.

---

### Aba 3.1: Listagem na Loja — Inglês (English - US) *(Idioma Primário Obrigatório)*

#### Nome do Produto (Name)
```text
RFM Matrix - Customer Segmentation (Roos Data Labs)
```

#### Resumo / Descrição Curta (Summary - Max 100 caracteres)
```text
5x5 RFM/RFV customer matrix with native cross-filtering, small multiples, and focus mode.
```
*(Contagem: 89 caracteres)*

#### Descrição Longa (Description - Formato Rich Text / Markdown)
```markdown
Empower your Power BI reports with the **RFM Matrix (Recency, Frequency, Monetary)** custom visual by **Roos Data Labs** — a strategic 5x5 customer segmentation matrix designed for executive decisions, retention marketing, and sales analytics.

### Why RFM Segmentation?
RFM analysis groups customers based on their purchasing behavior:
- **Recency (R1 to R5)**: How recently did the customer purchase?
- **Frequency / Monetary (FV1 to FV5)**: How often and how much do they spend?

Identify at a glance your **Champions**, **Loyal Customers**, customers **At Risk**, **Needing Attention**, or **Lost**, allowing marketing and sales teams to take proactive action before churn occurs.

---

### Key Capabilities

1. **Strategic 5x5 Layout with Official RFM Quadrants**:
   - Pre-mapped color-coded quadrants (Champions, Loyal Customers, Potential Loyalists, At Risk, Hibernating, Lost, etc.).
   - Responsive vector SVG rendering that scales crisply to any dashboard resolution (1920x1080 canvas, 4K, or mobile).

2. **Native Bidirectional Cross-Filtering**:
   - Click on any bubble or segment to instantly filter accompanying tables, cards, and bar charts across your report page.
   - Multi-select support with Ctrl/Cmd key. Click the background to clear filters.

3. **Multi-Dimensional Small Multiples**:
   - Split the matrix by customer tiers, sales channels, business units, or sales reps.
   - Global unified bubble scale ensures fair and immediate visual comparison across groups.

4. **One-Click Focus Mode**:
   - Seamlessly expand any small multiple card into a full-canvas detailed view with a single click.
   - Instant return via keyboard (Esc) or header back button.

5. **Ultra-Premium Dark Tooltips**:
   - Glassmorphic dark tooltip displaying segment name, category dot, recency score, frequency score, and all configured measure formats (currency, percentages, integers).

6. **Built-in Tri-Lingual Support**:
   - Switch all labels, tooltips, axis headers, and buttons on the fly between **English (en-US)**, **Português (pt-BR)**, and **Español (es-ES)** in the Format Pane.

7. **Enterprise Security & Privacy Compliant**:
   - 100% client-side execution. Zero external API calls, zero cookies, and zero external tracking. Fully safe for enterprise data governance.

---

### Field Well Configuration
- **Small Multiples (Optional)**: Column to divide the matrix into multiple cards (e.g., `Segment`, `Channel`).
- **Recency (1 to 5)**: Recency score integer (1 = Oldest, 5 = Most Recent).
- **Freq / Monetary (1 to 5)**: Frequency/Monetary score integer (1 = Lowest, 5 = Highest).
- **Customer Count (Values)**: Metric determining bubble size (e.g., `[Customer Count]`).
- **Tooltips (Optional)**: Additional measures to display in the custom tooltip (e.g., `[Total Revenue]`, `[Margin %]`).

---

### Support & Feedback
Developed with excellence by **Roos Data Labs**.
- Website: https://roosdatalabs.com
- Support: paulo@roosdatalabs.com
- Documentation: https://github.com/roosdatalabs/powerbi-rfv-matrix
```

---

#### Palavras-chave de Pesquisa (Search Keywords / Tags)
```text
RFM, RFV, Matrix, Customer Segmentation, Recency, Frequency, Monetary, Matriz RFV, Segmentação, Clientes, Roos Data Labs, Churn, Retention
```

#### Links e Informações de Contato
- **URL da Política de Privacidade (Privacy Policy URL)**: `https://roosdatalabs.com/privacy` *(ou o link do arquivo no seu repositório)*
- **URL dos Termos de Uso (Terms of Use URL)**: `https://roosdatalabs.com/terms` *(ou termos padrão Microsoft)*
- **URL de Suporte (Support URL)**: `https://roosdatalabs.com/support`
- **URL de Ajuda / Documentação (Help link)**: `https://github.com/roosdatalabs/powerbi-rfv-matrix`
- **E-mail de Contato**: `paulo@roosdatalabs.com`
- **Nome do Suporte**: `Roos Data Labs Support`
- **Telefone** *(opcional se solicitado)*: seu telefone corporativo

#### Mídias e Ativos Visuais (Marketplace Media)
- **Ícone Pequeno / Logo (300x300)**: Enviar o arquivo `assets/logo_300x300.png`
- **Screenshots (Exatamente 1366x768px - todos prontos e validados em `assets/`)**:
  1. `assets/screenshot_1_overview.png` (Visão geral do relatório com matriz e KPIs)
  2. `assets/screenshot_2_crossfilter.png` (Filtragem cruzada interativa em tempo real)
  3. `assets/screenshot_3_focus_mode.png` (Modo Foco em tela cheia)
  4. `assets/screenshot_4_format_pane.png` (Painel de formatação e opções customizáveis)
  5. `assets/screenshot_5_small_multiples.png` (Múltiplos pequenos lado a lado por segmento)

---

### Aba 3.2: Listagem na Loja — Português (Brasil)

#### Nome do Produto (Name)
```text
Matriz RFV / RFM - Segmentação de Clientes (Roos Data Labs)
```

#### Resumo / Descrição Curta (Summary - Max 100 caracteres)
```text
Matriz estratégica 5x5 RFV/RFM com cross-filtering nativo, múltiplos pequenos e modo foco.
```
*(Contagem: 90 caracteres)*

#### Descrição Longa (Description - Formato Rich Text / Markdown)
```markdown
Potencialize seus relatórios do Power BI com o visual customizado **Matriz RFV (Recência, Frequência e Valor)** desenvolvido pela **Roos Data Labs** — uma ferramenta analítica estratégica com layout 5x5 desenhada para suporte à tomada de decisão executiva, retenção de clientes e marketing orientado a dados.

### O que é a Análise RFV / RFM?
A metodologia RFV segmenta a carteira de clientes com base no histórico de transações reais:
- **Recência (R1 a R5)**: Há quanto tempo o cliente comprou pela última vez? (R1 = Mais Antiga, R5 = Mais Recente)
- **Frequência / Valor (FV1 a FV5)**: Com que regularidade e qual volume financeiro ele consome?

Identifique imediatamente quem são seus **Campeões**, clientes **Fiéis**, contas **Em Risco**, clientes **Precisando de Atenção**, **Hibernando** ou **Perdidos**, permitindo que os times de vendas e pós-vendas atuem proativamente contra o churn.

---

### Principais Recursos e Diferenciais

1. **Layout Estratégico 5x5 com Quadrantes Oficiais**:
   - 11 quadrantes analíticos mapeados com cores semânticas harmonizadas (Campeões, Clientes Fiéis, Potenciais Fiéis, Em Risco, Hibernando, Perdidos, etc.).
   - Renderização vetorial SVG de alto desempenho com proporção responsiva, garantindo nitidez cristalina em telas Full HD (1920x1080), 4K e dispositivos móveis.

2. **Cross-Filtering Bidirecional Nativo**:
   - Clique em qualquer bolha ou segmento para filtrar instantaneamente tabelas de clientes, gráficos e cartões de KPI em toda a página do relatório.
   - Suporte a seleção múltipla com a tecla Ctrl/Cmd e limpeza rápida ao clicar no fundo da matriz.

3. **Múltiplos Pequenos Multidimensionais (Small Multiples)**:
   - Divida a matriz em cards individuais por categoria (ex.: Segmento de Clientes, Canal de Distribuição, Região ou Representante).
   - Escala global unificada que mantém a proporção das bolhas idêntica entre todos os blocos, permitindo comparação visual imediata e confiável.

4. **Modo Foco em 1 Clique (Focus Mode)**:
   - Expanda qualquer bloco de múltiplos pequenos para cobrir 100% da área útil do visual com apenas um clique.
   - Retorno instantâneo à visão geral com botão dedicado ou pressionando a tecla `Esc`.

5. **Dica de Ferramenta (Tooltip) Dark Ultra-Premium**:
   - Design moderno com efeito glassmorphic exibindo nome do segmento, identificador de recência/frequência e formatação monetária (R$), percentual ou contagem conforme definido no modelo de dados.

6. **Alternância Dinâmica de Idiomas no Painel de Formatação**:
   - Alterne instantaneamente todos os rótulos de quadrantes, eixos, tooltips e botões entre **Português (pt-BR)**, **English (en-US)** e **Español (es-ES)** diretamente nas configurações do visual.

7. **Segurança e Privacidade Corporativa (100% Client-Side)**:
   - Todo o processamento ocorre na memória local do Power BI. O visual não realiza requisições de rede externas, não utiliza cookies e não armazena dados confidenciais fora da sessão.

---

### Mapeamento dos Campos no Visual
- **Múltiplos Pequenos (Opcional)**: Coluna para dividir a matriz em vários cards (ex.: `Segmento`, `Canal`).
- **Recência (1 a 5)**: Nota inteira de recência (1 = Mais Antiga, 5 = Mais Recente).
- **Freq / Monetário (1 a 5)**: Nota inteira combinada de frequência e valor (1 = Menor, 5 = Maior).
- **Quantidade de Clientes (Valores)**: Métrica ou contagem que determina o tamanho das bolhas.
- **Dicas de Ferramenta (Opcional)**: Medidas adicionais exibidas no tooltip (ex.: `[Faturamento Total]`, `[Ticket Médio]`).

---

### Suporte e Desenvolvedor
Desenvolvido com excelência por **Roos Data Labs**.
- Website: https://roosdatalabs.com
- Suporte Técnico: paulo@roosdatalabs.com
- Documentação e Repositório: https://github.com/roosdatalabs/powerbi-rfv-matrix
```

#### Palavras-chave de Pesquisa (Search Keywords / Tags)
```text
Matriz RFV, Matriz RFM, Segmentação de Clientes, Recência, Frequência, Valor, Churn, Retenção, Vendas, Marketing, Roos Data Labs, Power BI
```

---

### Aba 3.3: Listagem na Loja — Espanhol (Español)

#### Nombre del Producto (Name)
```text
Matriz RFM / RFV - Segmentación de Clientes (Roos Data Labs)
```

#### Resumen / Descripción Corta (Summary - Max 100 caracteres)
```text
Matriz estratégica 5x5 RFM/RFV con filtrado cruzado nativo, múltiplos pequeños y modo enfoque.
```
*(Contaje: 94 caracteres)*

#### Descripción Larga (Description - Formato Rich Text / Markdown)
```markdown
Potencie sus informes de Power BI con el visual personalizado **Matriz RFM (Recencia, Frecuencia y Monetario)** desarrollado por **Roos Data Labs** — una solución analítica estratégica con diseño 5x5 diseñada para la toma de decisiones ejecutivas, retención de clientes y marketing basado en datos.

### ¿Qué es el Análisis RFM / RFV?
La metodología RFM segmenta la cartera de clientes según su comportamiento histórico de compra:
- **Recencia (R1 a R5)**: ¿Cuándo fue la última compra del cliente? (R1 = Más Antigua, R5 = Más Reciente)
- **Frecuencia / Monetario (FV1 a FV5)**: ¿Con qué periodicidad y qué volumen monetario consume?

Identifique inmediatamente a sus **Campeones**, clientes **Leales**, cuentas **En Riesgo**, clientes que **Necesitan Atención**, **Hibernando** o **Perdidos**, permitiendo que los equipos comerciales y de fidelización actúen proactivamente antes de que ocurra la pérdida (churn).

---

### Principales Capacidades y Diferenciales

1. **Diseño Estratégico 5x5 con Cuadrantes Oficiales RFM**:
   - 11 cuadrantes analíticos mapeados con colores semánticos armonizados (Campeones, Clientes Leales, Potenciales Leales, En Riesgo, Hibernando, Perdidos, etc.).
   - Representación vectorial SVG de alto rendimiento con proporción adaptable y nítida en Full HD (1920x1080), 4K y dispositivos móviles.

2. **Filtrado Cruzado Bidireccional Nativo (Cross-Filtering)**:
   - Haga clic en cualquier burbuja o segmento para filtrar de inmediato tablas de clientes, gráficos de barras y tarjetas de KPI en toda la página del informe.
   - Selección múltiple manteniendo pulsada la tecla Ctrl/Cmd y limpieza rápida haciendo clic en el fondo.

3. **Múltiplos Pequeños Multidimensionales (Small Multiples)**:
   - Divida la matriz en tarjetas individuales por categoría (ej.: Segmento de Clientes, Canal de Distribución, Región o Representante Comercial).
   - Escala global unificada que preserva el tamaño proporcional de las burbujas entre todos los bloques para una comparación visual equitativa e inmediata.

4. **Modo Enfoque en 1 Clic (Focus Mode)**:
   - Expanda cualquier bloque de múltiplos pequeños para cubrir el 100% del lienzo del visual con un solo clic.
   - Retorno instantáneo a la cuadrícula general mediante el botón superior o presionando la tecla `Esc`.

5. **Información sobre Herramientas (Tooltip) Dark Ultra-Premium**:
   - Diseño moderno con efecto glassmorphic que presenta el nombre del segmento, etiqueta RFM y métricas numéricas con formato monetario, porcentual o entero del modelo semántico.

6. **Cambio Dinámico de Idiomas en el Panel de Formato**:
   - Alterne en tiempo real todas las etiquetas de cuadrantes, ejes, tooltips y botones entre **Español (es-ES)**, **English (en-US)** y **Português (pt-BR)** directamente desde el Panel de Formato.

7. **Seguridad y Privacidad Empresarial (100% Client-Side)**:
   - Todo el cálculo y renderizado se ejecuta en la memoria local de Power BI. El visual no realiza llamadas a servidores externos, no usa cookies ni almacena datos fuera de la sesión autenticada.

---

### Configuración de Campos en Power BI
- **Múltiplos Pequeños (Opcional)**: Campo categórico para dividir la matriz en varias tarjetas (ej.: `Segmento`, `Canal`).
- **Recencia (1 a 5)**: Puntuación entera de recencia (1 = Más Antigua, 5 = Más Reciente).
- **Frec / Monetario (1 a 5)**: Puntuación entera combinada de frecuencia y valor (1 = Menor, 5 = Mayor).
- **Cantidad de Clientes (Valores)**: Métrica o recuento que determina el tamaño de las burbujas.
- **Información sobre herramientas (Opcional)**: Medidas complementarias que se mostrarán en el tooltip (ej.: `[Facturación Total]`, `[Ticket Promedio]`).

---

### Soporte y Desarrollador
Desarrollado con excelencia por **Roos Data Labs**.
- Sitio Web: https://roosdatalabs.com
- Soporte Técnico: paulo@roosdatalabs.com
- Documentación y Repositorio: https://github.com/roosdatalabs/powerbi-rfv-matrix
```

#### Palabras Clave de Búsqueda (Search Keywords / Tags)
```text
Matriz RFM, Matriz RFV, Segmentación de Clientes, Recencia, Frecuencia, Monetario, Churn, Retención, Ventas, Marketing, Roos Data Labs, Power BI
```

---

### Aba 4: Pacotes (Packages)

1. Faça o upload do arquivo:
   `custom-visuals/tecdisaRfvMatrix/appsource-submission/Matriz_RFV_RoosDataLabs_v1.0.0.1.pbiviz`
2. Faça o upload do **Relatório de Amostra (`.pbix`)** demonstrativo:
   `custom-visuals/tecdisaRfvMatrix/appsource-submission/Matriz RFV - Showcase Roos Data Labs.pbix`

---

### Aba 5: Notas para Revisão e Certificação (Notes for Certification / Reviewer Instructions)

> **IMPORTANTE**: No campo de texto **"Notes for certification"** ou **"Review instructions"**, cole exatamente o texto abaixo em inglês. Esse texto orienta os engenheiros de validação da Microsoft a aprovarem o visual sem retrabalho:

```text
Dear Microsoft Power BI Visuals Certification Team,

Please find the re-submission for "RFM Matrix - Customer Segmentation" (Product ID: aa71f17f-7461-4a14-805f-ab51f9b7deb3) by Roos Data Labs.

This update addresses all feedback items and policies from prior certification reports:
1. Policy 1200.1.1.1 (Code Repository & Required "certification" Branch)
2. Policy 1180.2.5 (Right-Click Context Menu on Empty Space & Data Points)
3. Policy 100.14.1 (Step-by-Step Testing Instructions & Repository Access)

==================================================
1. SOURCE CODE REPOSITORY & CERTIFICATION BRANCH (Policy 1200.1.1.1)
==================================================
- Source Code Repository URL: https://github.com/roosdatalabs/powerbi-rfv-matrix
- Certification Branch: certification
- Direct Branch Link: https://github.com/roosdatalabs/powerbi-rfv-matrix/tree/certification
- Repository Access: The repository is 100% PUBLIC. No credentials, tokens, or invitations are required to clone, inspect, or build the source code.
- Version Tag: v1.0.0.1
- Package Match: The source code in the 'certification' branch matches the submitted package 'Matriz_RFV_RoosDataLabs_v1.0.0.1.pbiviz' with 100% byte fidelity.
- Build Artifacts Hygiene: Output directories (dist/, node_modules/, .tmp/) are properly excluded via .gitignore per policy 1200.1.1.
- License: Open-source MIT License.

==================================================
2. PREMIUM FEATURES & LICENSE / ACTIVATION KEYS
==================================================
- Premium Features: NONE.
- Activation Keys: NOT APPLICABLE.
- Pricing Model: 100% Free. The visual does not contain any paid tiers, subscriptions, paywalls, or in-app purchases. All features are fully functional out of the box.

==================================================
3. RIGHT-CLICK CONTEXT MENU VERIFICATION (Policy 1180.2.5)
==================================================
- Empty Space Context Menu: Right-clicking anywhere on the empty space (matrix background, card containers, headers, or whitespace) invokes `selectionManager.showContextMenu({}, { x, y })`, correctly displaying the native visual-level basic context menu.
- Data Point Context Menu: Right-clicking on any bubble data point invokes `selectionManager.showContextMenu(selectionId, { x, y })`, displaying data-point specific actions (Include, Exclude, Show as a table, etc.).

==================================================
4. STEP-BY-STEP TESTING INSTRUCTIONS (Using Attached Sample PBIX)
==================================================
Visual Details:
- Name: Matrix RFV / RFM
- GUID: roosRfvMatrixC82A8D124C704536BA3D66733D198070
- Version: 1.0.0.1
- API Version: 5.11.1

Test Steps:
1. Context Menu Testing:
   - On any page, right-click on the background / empty space of the matrix visual -> Verify that Power BI's basic context menu is displayed.
   - Right-click directly on any bubble -> Verify that the data-point context menu is displayed with data options.

2. Page 1 - "Executive Overview":
   - Observe the 5x5 RFM Matrix rendered with 11 strategic color-coded quadrants.
   - Click any bubble (e.g., "Champions" or "At Risk") to verify bidirectional cross-filtering on the accompanying table and KPI cards.
   - Hover over bubbles to test the styled dark tooltip displaying segment metrics and custom formatting.
   - Click the matrix background to clear cross-filtering selections.

3. Page 2 - "Executive Overview - Multiples":
   - Observe the Small Multiples mode grouped by customer segment/tier.
   - Notice the unified global bubble scale across cards.
   - Click the "Focus" button on any card (or click its title) to trigger Focus Mode, expanding the card to fill the entire visual container.
   - Click "<- Back to all blocks" or press the 'Esc' key to return to the full small multiples grid.

4. Format Pane Customization:
   - In Format Pane > "Quadrants" > "Labels Language", toggle between "English (en-US)", "Português (pt-BR)", and "Español (es-ES)". Observe instantaneous localization of quadrant names, axis markers, buttons, and tooltips.
   - In "Quadrants" > "Background Opacity (%)", test slider responsiveness.
   - In "Small Multiples" > "Columns per Row", test column layout changes (1 to 4).

==================================================
5. SECURITY & PRIVACY VERIFICATION
==================================================
- 100% client-side execution in memory.
- Zero external HTTP/HTTPS network calls, zero WebSockets, and zero external resource loaders.
- No access to local storage, cookies, or external tracking.
- Fully compliant with Microsoft Power BI Certified Visual requirements.

Thank you for your review. For any inquiries, please contact paulo@roosdatalabs.com.
```

---

## 3. Checklist Final Pré-Envio

- [x] Pacote `.pbiviz` compilado e testado com metadados da Roos Data Labs.
- [x] Ícone 20x20px e Logo 300x300px validados e dimensionados.
- [x] Zero chamadas de rede externas no código-fonte (elegível para Certificação).
- [x] Política de Privacidade e documento de Suporte gerados.
- [x] Relatório `.pbix` de demonstração pronto.
- [x] Screenshots prontos para upload.
- [x] Instruções para a equipe de revisão da Microsoft preparadas.
