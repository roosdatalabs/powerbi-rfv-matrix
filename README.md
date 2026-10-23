# RFM Matrix / Matriz RFV — Custom Visual for Microsoft Power BI
### by Roos Data Labs

[![Power BI](https://img.shields.io/badge/Power_BI-Visuals_API_5.11-F2C811?logo=powerbi&logoColor=black)](https://powerbi.microsoft.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0.2-green.svg)](appsource-submission/Matriz_RFV_RoosDataLabs_v1.0.0.2.pbiviz)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_Client--Side-brightgreen.svg)](appsource-submission/PRIVACY_POLICY.md)
[![Testing](https://img.shields.io/badge/Testing-Verified-blue.svg)](TESTING.md)

An interactive, high-performance **5x5 RFM (Recency, Frequency, Monetary) / RFV** customer segmentation matrix custom visual for Microsoft Power BI. 

Engineered by **Roos Data Labs**, this visual empowers executive boards, marketing analysts, and sales leaders to instantly visualize customer distribution, detect churn risks, and drive targeted retention campaigns.

---

## 🌟 Key Features

1. **Strategic 5x5 Matrix Layout**:
   - 11 pre-mapped color-coded quadrants based on official RFM methodology: *Champions*, *Loyal Customers*, *Potential Loyalists*, *Need Attention*, *At Risk*, *About to Sleep*, *Hibernating*, *Lost*, and more.
   - Vector SVG rendering ensuring crisp, beautiful visualization on any canvas size (1920x1080, 4K, or mobile).

2. **Native Bidirectional Cross-Filtering**:
   - Click any bubble or segment to cross-filter tables, bar charts, and KPI cards across the report page.
   - Multi-select support with `Ctrl`/`Cmd` key; click the canvas background to clear selections.

3. **Multi-Dimensional Small Multiples**:
   - Split the matrix into side-by-side cards grouped by customer tier, sales channel, region, or sales rep.
   - Global unified bubble scale across all groups ensures fair, immediate visual comparison.

4. **One-Click Focus Mode**:
   - Click the **Focus** / **Focar** button (or card title) on any small multiple to expand it to fill the entire visual container.
   - Quick return with the back button or by pressing the `Esc` key.

5. **Ultra-Premium Dark Glassmorphic Tooltips**:
   - Styled dark tooltip displaying cluster name, score badge, customer count, and configured metric formats (currency, percent, integers).

6. **Tri-Lingual Localization Built-in**:
   - Switch all visual labels, axes, buttons, and tooltips in real-time between **English (`en-US`)**, **Português (`pt-BR`)**, and **Español (`es-ES`)** directly in the Format Pane (*Quadrants > Labels Language*).

7. **Enterprise Security & Privacy**:
   - 100% client-side execution in memory. Zero external network requests, zero cookies, zero data tracking. Fully compliant with Power BI Certified Visual requirements.

---

## 📊 Visual Data Roles (Field Well)

| Field / Role | Type | Required | Description |
|---|---|---|---|
| **Múltiplos Pequenos / Small Multiples** | Grouping | Optional | Categorical field to divide the matrix into multiple cards (e.g. `dClientes[Segmento]`). |
| **Recência / Recency (1 a 5)** | Measure / Column | **Required** | Integer score from 1 (Oldest purchase) to 5 (Most recent purchase). |
| **Freq / Monetário (1 a 5)** | Measure / Column | **Required** | Combined integer score from 1 (Lowest spend/frequency) to 5 (Highest). |
| **Quantidade de Clientes / Values** | Measure | **Required** | Metric determining bubble size (e.g. `[Qtd Clientes]`). |
| **Dicas de ferramenta / Tooltips** | Measure / Column | Optional | Additional measures to show in the tooltip (e.g. `[Faturamento Total]`, `[Ticket Médio]`). |

---

## 🛠️ Data Modeling & DAX Guide

### 1. Dimension Table (`#MatrizRFM`)
Create a calculated table containing the 25 matrix coordinate combinations (Recency 1-5, Freq/Monetary 1-5):

```dax
#MatrizRFM = 
VAR Recencia = SELECTCOLUMNS(GENERATESERIES(1, 5, 1), "Recencia", [Value])
VAR Frequencia = SELECTCOLUMNS(GENERATESERIES(1, 5, 1), "Frequencia/Monetario", [Value])
RETURN
GENERATE(
    Recencia,
    Frequencia
)
```

Add a calculated column for the primary key:
```dax
ChaveRFM = [Recencia] * 10 + [Frequencia/Monetario]
```

### 2. Metric Binding
Create your measures relating the customer base to the matrix:

```dax
Qtd Clientes RFM Tabela = 
CALCULATE(
    DISTINCTCOUNT(dClientes[ID_Cliente]),
    TREATAS(
        VALUES('#MatrizRFM'[ChaveRFM]),
        dClientes[ChaveRFM]
    )
)
```

---

## 💻 Developer Setup & Build

This project is built using the official [Microsoft Power BI Visuals Tools (`powerbi-visuals-tools`)](https://github.com/microsoft/PowerBI-visuals-tools) and TypeScript.

### Prerequisites
- Node.js (v18 or v20 LTS recommended)
- npm

### Installation
```bash
git clone https://github.com/roosdatalabs/powerbi-rfv-matrix.git
cd powerbi-rfv-matrix
npm install
```

### Packaging the Visual
```bash
npx powerbi-visuals-tools package --certification-audit
```
The compiled visual package will be generated at:
`dist/roosRfvMatrixC82A8D124C704536BA3D66733D198070.1.0.0.2.pbiviz`

---

## 🧪 Testing & Review Instructions

Complete step-by-step verification procedures are documented in:
👉 **[TESTING.md](TESTING.md)**

### Quick Verification Checklist:
1. **Sample Report**: Open [`appsource-submission/Matriz RFV - Showcase Roos Data Labs.pbix`](appsource-submission/Matriz%20RFV%20-%20Showcase%20Roos%20Data%20Labs.pbix) in Power BI Desktop.
2. **Context Menu (Policy 1180.2.5)**:
   - Right-click on empty background space -> Basic visual context menu displays.
   - Right-click directly on any bubble -> Data-point context menu displays.
3. **Cross-Filtering**: Click any bubble (e.g., *Champions*) -> Accompanying tables and cards cross-filter immediately. Click background to clear.
4. **Small Multiples & Focus Mode**: On Page 2, click the **Focus** button on any card to maximize it; press `Esc` to return.
5. **Localization**: In Format Pane > *Quadrants > Labels Language*, toggle between `English (en-US)`, `Português (pt-BR)`, and `Español (es-ES)`.
6. **Code Quality**: Run `npm run lint` (0 errors, 0 warnings).

---

## 📁 Repository Structure

```text
├── appsource-submission/       # Official Microsoft AppSource submission kit
│   ├── Matriz_RFV_RoosDataLabs_v1.0.0.pbiviz
│   ├── SUBMISSION_GUIDE.md     # Complete store copy & reviewer instructions
│   ├── PRIVACY_POLICY.md       # Formal privacy compliance document
│   ├── SUPPORT.md              # Support and SLA terms
│   └── assets/                 # Icons (20x20, 300x300) and 1366x768 screenshots
├── assets/                     # Design assets & visual icons
├── src/
│   ├── visual.ts               # Core visual rendering logic, D3/SVG & event handlers
│   └── settings.ts             # Power BI Modern Formatting Model settings cards
├── style/
│   └── visual.less             # Container, cards, focus mode & tooltip styling
├── stringResources/            # Tri-lingual metadata (en-US, pt-BR, es-ES)
├── capabilities.json           # Data roles, mappings & format pane definition
├── pbiviz.json                 # Visual manifest & metadata
└── package.json
```

---

## 🔒 Privacy & Compliance

- **No Data Collection**: The visual does not collect, transmit, or store any data outside of the Power BI runtime session.
- **Client-Side Only**: Runs entirely in the browser / Power BI Desktop client.
- **Power BI Certified Visual**: Designed to meet Microsoft Power BI Visuals Certification criteria.

Read the full [Privacy Policy](appsource-submission/PRIVACY_POLICY.md) and [Support Terms](appsource-submission/SUPPORT.md).

---

## 📬 Contact & Support

Developed by **Roos Data Labs**  
- **Lead Developer**: Paulo Roos  
- **Email**: [paulo@roosdatalabs.com](mailto:paulo@roosdatalabs.com)  
- **Website**: [https://roosdatalabs.com](https://roosdatalabs.com)  
- **Issues & Contributions**: [GitHub Issues](https://github.com/roosdatalabs/powerbi-rfv-matrix/issues)

---

*Copyright © 2026 Roos Data Labs. Released under the [MIT License](LICENSE).*
