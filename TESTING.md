# 🧪 Testing & Certification Verification Guide
## Matrix RFV / RFM Custom Visual for Power BI (Roos Data Labs)

This document provides step-by-step instructions for the **Microsoft Power BI Certification & AppSource Validation Team** (and developers) to test and verify the visual functionality, code quality, and security compliance.

---

## 1. Visual Specification

- **Product Name**: Matrix RFV / RFM
- **Product ID**: `aa71f17f-7461-4a14-805f-ab51f9b7deb3`
- **Visual GUID**: `roosRfvMatrixC82A8D124C704536BA3D66733D198070`
- **Visual Version**: `1.0.0.2`
- **API Version**: `5.11.1`
- **Publisher**: Roos Data Labs (`paulo@roosdatalabs.com`)
- **Repository**: [https://github.com/roosdatalabs/powerbi-rfv-matrix](https://github.com/roosdatalabs/powerbi-rfv-matrix)
- **Certification Branch**: `certification`
- **Release Tag**: `v1.0.0.2`
- **License**: MIT

---

## 2. Automated Code & Certification Audit

To verify linting, security, and packaging locally:

```bash
# 1. Clone the certification branch
git clone -b certification https://github.com/roosdatalabs/powerbi-rfv-matrix.git
cd powerbi-rfv-matrix

# 2. Install dependencies
npm install

# 3. Run ESLint (using official eslint-plugin-powerbi-visuals)
npm run lint

# 4. Run automated package build with Microsoft certification audit
npx powerbi-visuals-tools package --certification-audit
```

### Expected Output
- `npm run lint`: **0 errors, 0 warnings**.
- `npx powerbi-visuals-tools package --certification-audit`:
  - `No external requests found in the visual.`
  - `Build completed successfully.`
  - Generated package matches: `dist/roosRfvMatrixC82A8D124C704536BA3D66733D198070.1.0.0.2.pbiviz`

---

## 3. Sample Report for Testing

A complete, self-contained demonstration report is pre-configured and included in this repository:
📁 **File Path**: [`appsource-submission/Matriz RFV - Showcase Roos Data Labs.pbix`](appsource-submission/Matriz%20RFV%20-%20Showcase%20Roos%20Data%20Labs.pbix)

Open this file in **Microsoft Power BI Desktop** (September 2023 or newer) to execute the test scenarios below.

---

## 4. Step-by-Step Functional Verification Scenarios

### Scenario 1: Context Menu Verification (Policy 1180.2.5)
1. **Empty Space Context Menu**:
   - Right-click anywhere on the empty space/background of the Matrix visual (or card container / headers).
   - **Expected Result**: Power BI's standard visual-level context menu opens at the cursor coordinates.
2. **Data Point Context Menu**:
   - Right-click directly on any bubble data point (e.g. *Champions* or *At Risk*).
   - **Expected Result**: Power BI's data-point context menu opens with options (*Include*, *Exclude*, *Show as a table*, etc.).

---

### Scenario 2: Executive Overview & Bidirectional Cross-Filtering (Page 1)
1. Navigate to **Page 1 - "Executive Overview"**.
2. **Matrix Rendering**:
   - Observe the 5x5 RFM grid with 11 strategic color-coded quadrants (*Champions*, *Loyal Customers*, *Potential Loyalists*, *Need Attention*, *At Risk*, *About to Sleep*, *Hibernating*, *Lost*, etc.).
3. **Cross-Filtering**:
   - Click on the *Champions* bubble -> Observe that the customer table below and the KPI cards are filtered to show only Champions.
   - Hold `Ctrl` (or `Cmd`) and click another bubble -> Multi-selection applies.
   - Click the matrix background -> All selections are cleared, restoring the full unfiltered view.
4. **Tooltips**:
   - Hover over any bubble -> A dark glassmorphic tooltip appears displaying the cluster tag, scores, customer count, and configured metric formatting.

---

### Scenario 3: Small Multiples & Focus Mode (Page 2)
1. Navigate to **Page 2 - "Executive Overview - Multiples"**.
2. **Small Multiples Grid**:
   - Observe the matrix split by customer segment/tier into side-by-side cards.
   - Notice that the bubble radius scale is globally unified across all cards for fair comparison.
3. **Focus Mode (Expand Card)**:
   - Hover over any card and click the **Focus** (or **Focar**) button on its header (or click the card title).
   - **Expected Result**: The selected card smoothly expands to occupy 100% of the visual container area.
4. **Return from Focus Mode**:
   - Click the **"← Back to all blocks"** button in the header, or press the **`Esc`** key on your keyboard.
   - **Expected Result**: The view returns immediately to the multi-card grid.

---

### Scenario 4: Format Pane Localization & Customization
1. Select the Matrix visual and open the **Format Pane**.
2. Under **Quadrants** > **Labels Language**:
   - Toggle between **English (en-US)**, **Português (pt-BR)**, and **Español (es-ES)**.
   - **Expected Result**: All quadrant labels, axis headers, action buttons, and tooltips localize in real time.
3. Under **Quadrants** > **Background Opacity (%)**:
   - Adjust the slider between 0% and 100% -> Quadrant background fills adapt dynamically.
4. Under **Small Multiples** > **Columns per Row**:
   - Change the value between 1 and 4 -> Grid columns reorganize smoothly.

---

## 5. Security & Privacy Compliance (Policy 1200.1.3)

- **100% Client-Side Execution**: Runs entirely in the Power BI sandbox iframe.
- **Zero External Network Calls**: No `fetch`, `XMLHttpRequest`, `WebSocket`, or `<script>` injection.
- **Zero Local Persistence**: No `localStorage`, `sessionStorage`, or cookies.
- **Safe DOM APIs**: Exclusively uses `document.createElement`, `document.createElementNS`, and `.textContent`. No `innerHTML` or `eval`.
- **Privileges**: Explicitly empty array (`"privileges": []` in `capabilities.json`).

---

For any questions regarding this visual, contact:  
**Paulo Roos** — Roos Data Labs  
📧 [paulo@roosdatalabs.com](mailto:paulo@roosdatalabs.com)  
🌐 [https://roosdatalabs.com](https://roosdatalabs.com)
