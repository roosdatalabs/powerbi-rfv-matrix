/*
 *  Matriz RFV / RFM - Custom Visual Oficial para Power BI
 *  Desenvolvido por Roos Data Labs (Paulo)
 *  Compatível com Microsoft AppSource & Power BI Certified Visual Standards
 *  Suporte a Small Multiples (Múltiplos Pequenos) + Modo Foco (Expandir Bloco)
 */
"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import IVisualEventService = powerbi.extensibility.IVisualEventService;
import ISelectionManager = powerbi.extensibility.ISelectionManager;
import ISelectionId = powerbi.visuals.ISelectionId;
import VisualTooltipDataItem = powerbi.extensibility.VisualTooltipDataItem;
import DataView = powerbi.DataView;

import { VisualFormattingSettingsModel } from "./settings";

interface MatrixDataPoint {
    clusterId: string;
    clusterName: string;
    recencia: number;
    frequenciaMonetario: number;
    value: number;
    valueDisplayName: string;
    valueFormat?: string;
    groupName?: string;
    extraTooltips?: VisualTooltipDataItem[];
    selectionId: ISelectionId;
    color: string;
}

interface MultiplesGroup {
    groupName: string;
    totalValue: number;
    dataPoints: MatrixDataPoint[];
}

interface ParsedMatrixData {
    groups: MultiplesGroup[];
    allPoints: MatrixDataPoint[];
    globalMaxValue: number;
    isMultiples: boolean;
    valColName: string;
    valColFormat?: string;
}

const QUADRANT_NAMES_BY_LANG: Record<string, Record<string, string>> = {
    "pt-BR": {
        "nao_pode_perdelos": "NÃO PODE PERDÊ-LOS",
        "campeoes": "CAMPEÕES",
        "clientes_leais": "CLIENTES FIÉIS",
        "potenciais_leais": "POTENCIAIS FIÉIS",
        "precisam_atencao": "PRECISANDO DE ATENÇÃO",
        "em_risco": "EM RISCO",
        "quase_dormindo": "QUASE DORMINDO",
        "hibernando": "HIBERNANDO",
        "promissores": "PROMISSORES",
        "clientes_recentes": "CLIENTES RECENTES",
        "perdidos": "PERDIDOS"
    },
    "en-US": {
        "nao_pode_perdelos": "CAN'T LOSE THEM",
        "campeoes": "CHAMPIONS",
        "clientes_leais": "LOYAL CUSTOMERS",
        "potenciais_leais": "POTENTIAL LOYALISTS",
        "precisam_atencao": "NEED ATTENTION",
        "em_risco": "AT RISK",
        "quase_dormindo": "ABOUT TO SLEEP",
        "hibernando": "HIBERNATING",
        "promissores": "PROMISING",
        "clientes_recentes": "NEW CUSTOMERS",
        "perdidos": "LOST"
    },
    "es-ES": {
        "nao_pode_perdelos": "NO SE PUEDEN PERDER",
        "campeoes": "CAMPEONES",
        "clientes_leais": "CLIENTES LEALES",
        "potenciais_leais": "POTENCIALES LEALES",
        "precisam_atencao": "NECESITAN ATENCIÓN",
        "em_risco": "EN RIESGO",
        "quase_dormindo": "CASI DORMIDOS",
        "hibernando": "HIBERNANDO",
        "promissores": "PROMETEDORES",
        "clientes_recentes": "CLIENTES RECIENTES",
        "perdidos": "PERDIDOS"
    }
};

const AXIS_X_BY_LANG: Record<string, { x: number; text: string }[]> = {
    "pt-BR": [
        { x: 100, text: "R1 (Mais Antiga)" },
        { x: 300, text: "R2" },
        { x: 500, text: "R3" },
        { x: 700, text: "R4" },
        { x: 900, text: "R5 (Mais Recente)" }
    ],
    "en-US": [
        { x: 100, text: "R1 (Oldest)" },
        { x: 300, text: "R2" },
        { x: 500, text: "R3" },
        { x: 700, text: "R4" },
        { x: 900, text: "R5 (Most Recent)" }
    ],
    "es-ES": [
        { x: 100, text: "R1 (Más Antigua)" },
        { x: 300, text: "R2" },
        { x: 500, text: "R3" },
        { x: 700, text: "R4" },
        { x: 900, text: "R5 (Más Reciente)" }
    ]
};

interface UiStrings {
    focusBtn: string;
    focusTitle: string;
    focusAria: (name: string) => string;
    cardTitleTooltip: string;
    defaultSegment: string;
    totalPrefix: string;
    backBtn: string;
    backBtnTitle: string;
    focusedTitlePrefix: string;
    focusedDefaultSegment: string;
    tooltipGroupLabel: string;
}

const UI_STRINGS_BY_LANG: Record<string, UiStrings> = {
    "pt-BR": {
        focusBtn: "Focar",
        focusTitle: "Focar e cobrir todo o espaço disponível",
        focusAria: (name: string) => `Focar em ${name}`,
        cardTitleTooltip: "Clique para focar neste bloco",
        defaultSegment: "Segmento",
        totalPrefix: "Total: ",
        backBtn: "← Voltar aos blocos",
        backBtnTitle: "Voltar para a visão de todos os blocos (Esc)",
        focusedTitlePrefix: "Segmento: ",
        focusedDefaultSegment: "Geral",
        tooltipGroupLabel: "Múltiplo / Grupo"
    },
    "en-US": {
        focusBtn: "Focus",
        focusTitle: "Focus and expand to fill available space",
        focusAria: (name: string) => `Focus on ${name}`,
        cardTitleTooltip: "Click to focus on this block",
        defaultSegment: "Segment",
        totalPrefix: "Total: ",
        backBtn: "← Back to all blocks",
        backBtnTitle: "Return to all small multiples (Esc)",
        focusedTitlePrefix: "Segment: ",
        focusedDefaultSegment: "General",
        tooltipGroupLabel: "Multiple / Group"
    },
    "es-ES": {
        focusBtn: "Enfocar",
        focusTitle: "Enfocar y cubrir todo el espacio disponible",
        focusAria: (name: string) => `Enfocar en ${name}`,
        cardTitleTooltip: "Haga clic para enfocar este bloque",
        defaultSegment: "Segmento",
        totalPrefix: "Total: ",
        backBtn: "← Volver a los bloques",
        backBtnTitle: "Volver a la vista de todos los bloques (Esc)",
        focusedTitlePrefix: "Segmento: ",
        focusedDefaultSegment: "General",
        tooltipGroupLabel: "Múltiplo / Grupo"
    }
};

interface QuadrantDef {
    id: string;
    name: string;
    shapeType: "rect" | "path";
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rx?: number;
    pathD?: string;
    fill: string;
    fillOpacity: number;
    stroke: string;
    textColor: string;
    textX: number;
    textY: number;
    bubbleColor: string;
    cells: [number, number][];
}

const QUADRANTS: QuadrantDef[] = [
    {
        id: "nao_pode_perdelos",
        name: "NÃO PODE PERDÊ-LOS",
        shapeType: "rect",
        x: 0,
        y: 0,
        width: 400,
        height: 150,
        rx: 6,
        fill: "#FEE2E2",
        fillOpacity: 0.75,
        stroke: "#FCA5A5",
        textColor: "#DC2626",
        textX: 18,
        textY: 28,
        bubbleColor: "#DC2626",
        cells: [[1, 5], [2, 5]]
    },
    {
        id: "campeoes",
        name: "CAMPEÕES",
        shapeType: "rect",
        x: 800,
        y: 0,
        width: 200,
        height: 150,
        rx: 6,
        fill: "#DCFCE7",
        fillOpacity: 0.85,
        stroke: "#86EFAC",
        textColor: "#16A34A",
        textX: 818,
        textY: 28,
        bubbleColor: "#16A34A",
        cells: [[5, 5]]
    },
    {
        id: "clientes_leais",
        name: "CLIENTES FIÉIS",
        shapeType: "path",
        pathD: "M400 0 H800 V150 H1000 V300 H400 Z",
        fill: "#E0F2FE",
        fillOpacity: 0.75,
        stroke: "#7DD3FC",
        textColor: "#0284C7",
        textX: 418,
        textY: 28,
        bubbleColor: "#0284C7",
        cells: [[3, 5], [4, 5], [3, 4], [4, 4], [5, 4]]
    },
    {
        id: "em_risco",
        name: "EM RISCO",
        shapeType: "rect",
        x: 0,
        y: 150,
        width: 400,
        height: 300,
        rx: 6,
        fill: "#FFEDD5",
        fillOpacity: 0.75,
        stroke: "#FDBA74",
        textColor: "#EA580C",
        textX: 18,
        textY: 178,
        bubbleColor: "#EA580C",
        cells: [[1, 3], [2, 3], [1, 4], [2, 4]]
    },
    {
        id: "precisam_de_atencao",
        name: "PRECISAM DE ATENÇÃO",
        shapeType: "rect",
        x: 400,
        y: 300,
        width: 200,
        height: 150,
        rx: 6,
        fill: "#FEF9C3",
        fillOpacity: 0.85,
        stroke: "#FDE047",
        textColor: "#CA8A04",
        textX: 418,
        textY: 328,
        bubbleColor: "#CA8A04",
        cells: [[3, 3]]
    },
    {
        id: "potenciais_leais",
        name: "POTENCIAIS CLIENTES LEAIS",
        shapeType: "rect",
        x: 600,
        y: 300,
        width: 400,
        height: 300,
        rx: 6,
        fill: "#DBEAFE",
        fillOpacity: 0.75,
        stroke: "#93C5FD",
        textColor: "#2563EB",
        textX: 618,
        textY: 328,
        bubbleColor: "#2563EB",
        cells: [[4, 2], [5, 2], [4, 3], [5, 3]]
    },
    {
        id: "hibernando",
        name: "HIBERNANDO",
        shapeType: "rect",
        x: 200,
        y: 450,
        width: 200,
        height: 150,
        rx: 6,
        fill: "#FEFCE8",
        fillOpacity: 0.85,
        stroke: "#FEF08A",
        textColor: "#A16207",
        textX: 218,
        textY: 478,
        bubbleColor: "#B45309",
        cells: [[2, 2]]
    },
    {
        id: "prestes_a_dormir",
        name: "PRESTES A DORMIR",
        shapeType: "rect",
        x: 400,
        y: 450,
        width: 200,
        height: 300,
        rx: 6,
        fill: "#E0F2FE",
        fillOpacity: 0.75,
        stroke: "#BAE6FD",
        textColor: "#0284C7",
        textX: 418,
        textY: 478,
        bubbleColor: "#0284C7",
        cells: [[3, 1], [3, 2]]
    },
    {
        id: "promissores",
        name: "PROMISSORES",
        shapeType: "rect",
        x: 600,
        y: 600,
        width: 200,
        height: 150,
        rx: 6,
        fill: "#E0E7FF",
        fillOpacity: 0.85,
        stroke: "#C7D2FE",
        textColor: "#4338CA",
        textX: 618,
        textY: 628,
        bubbleColor: "#4F46E5",
        cells: [[4, 1]]
    },
    {
        id: "clientes_recentes",
        name: "CLIENTES RECENTES",
        shapeType: "rect",
        x: 800,
        y: 600,
        width: 200,
        height: 150,
        rx: 6,
        fill: "#FEF3C7",
        fillOpacity: 0.85,
        stroke: "#FDE68A",
        textColor: "#D97706",
        textX: 818,
        textY: 628,
        bubbleColor: "#D97706",
        cells: [[5, 1]]
    },
    {
        id: "perdidos",
        name: "PERDIDOS",
        shapeType: "path",
        pathD: "M0 450 H200 V600 H400 V750 H0 Z",
        fill: "#F1F5F9",
        fillOpacity: 0.9,
        stroke: "#CBD5E1",
        textColor: "#475569",
        textX: 18,
        textY: 478,
        bubbleColor: "#475569",
        cells: [[1, 1], [2, 1], [1, 2]]
    }
];

function formatMetricValue(value: unknown, formatString?: string, decimalsOverride?: number): string {
    if (value === null || value === undefined) return "-";
    if (typeof value !== "number") return String(value);

    const forcedDecimals = (decimalsOverride !== undefined && decimalsOverride >= 0) ? decimalsOverride : undefined;

    // 1. Detecção de Moeda
    if (formatString && (formatString.includes("R$") || formatString.includes("$") || formatString.toLowerCase().includes("currency"))) {
        const dec = forcedDecimals !== undefined ? forcedDecimals : 2;
        return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: dec, maximumFractionDigits: dec });
    }

    // 2. Detecção de Percentual
    if (formatString && formatString.includes("%")) {
        const dec = forcedDecimals !== undefined ? forcedDecimals : 1;
        const pct = Math.abs(value) <= 1 ? value * 100 : value;
        return `${pct.toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec })}%`;
    }

    // 3. Decimais forçados manualmente
    if (forcedDecimals !== undefined) {
        return value.toLocaleString("pt-BR", { minimumFractionDigits: forcedDecimals, maximumFractionDigits: forcedDecimals });
    }

    // 4. Formato baseado no formatString
    if (formatString && (formatString.includes(".00") || formatString.includes(",00"))) {
        return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    // 5. Inteiro ou Decimal Automático
    if (Number.isInteger(value)) {
        return value.toLocaleString("pt-BR");
    } else {
        return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

function clearElement(element: Element | HTMLElement): void {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

export class Visual implements IVisual {
    private host: IVisualHost;
    private events: IVisualEventService;
    private selectionManager: ISelectionManager;
    private formattingSettingsService: FormattingSettingsService;
    private formattingSettings: VisualFormattingSettingsModel;
    private target: HTMLElement;
    private container: HTMLDivElement;
    private singleSvg: SVGSVGElement | null = null;
    private landingPage: HTMLDivElement;
    private customTooltip: HTMLDivElement;
    private parsedData: ParsedMatrixData | null = null;
    private selectedIds: ISelectionId[] = [];
    private focusedGroupName: string | null = null;
    private currentDataView: powerbi.DataView | null = null;

    constructor(options: VisualConstructorOptions) {
        this.host = options.host;
        this.events = options.host.eventService;
        this.selectionManager = this.host.createSelectionManager();
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;

        this.initDOM();
    }

    private getLanguage(): string {
        let configured: any = this.formattingSettings?.quadrantSettings?.language?.value;
        if (configured === undefined || configured === null) {
            configured = (this.currentDataView?.metadata?.objects as any)?.quadrantSettings?.language;
        }
        if (configured !== undefined && configured !== null) {
            let valStr = "";
            if (typeof configured === "object" && configured !== null && "value" in configured) {
                valStr = String(configured.value ?? "");
            } else {
                valStr = String(configured);
            }
            valStr = valStr.trim();
            if (valStr === "en-US" || valStr === "es-ES" || valStr === "pt-BR") {
                return valStr;
            }
            const lower = valStr.toLowerCase();
            if (lower.startsWith("en")) return "en-US";
            if (lower.startsWith("es")) return "es-ES";
            if (lower.startsWith("pt")) return "pt-BR";
        }
        const hostLocale = (this.host && (this.host as any).locale) ? String((this.host as any).locale).toLowerCase() : "";
        if (hostLocale.startsWith("en")) return "en-US";
        if (hostLocale.startsWith("es")) return "es-ES";
        return "pt-BR";
    }

    private initDOM(): void {
        clearElement(this.target);

        this.container = document.createElement("div");
        this.container.className = "tecdisa-rfv-container";

        // Landing Page Element
        this.landingPage = document.createElement("div");
        this.landingPage.className = "rfv-landing-page";
        this.buildLandingPageContent();
        this.container.appendChild(this.landingPage);

        // Tooltip Customizado Flutuante
        this.customTooltip = document.createElement("div");
        this.customTooltip.className = "rfv-custom-tooltip";
        this.container.appendChild(this.customTooltip);

        this.target.appendChild(this.container);

        // Listener global para Esc fechar o modo foco
        window.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape" && this.focusedGroupName) {
                this.focusedGroupName = null;
                this.renderContent();
            }
        });
    }

    private buildLandingPageContent(): void {
        clearElement(this.landingPage);

        const title = document.createElement("h2");
        title.className = "landing-title";
        title.textContent = "Matriz RFV / RFM";

        const subtitle = document.createElement("p");
        subtitle.className = "landing-subtitle";
        subtitle.textContent = "Selecione Recência, Freq/Monetário e Quantidade de Clientes. Opcionalmente adicione Múltiplos Pequenos para criar várias matrizes lado a lado.";

        const tagsContainer = document.createElement("div");
        tagsContainer.className = "landing-tags";

        const tags = [
            "Recência (1 a 5)",
            "Freq/Monetário (1 a 5)",
            "Quantidade de Clientes",
            "Múltiplos Pequenos (opcional)",
            "Dicas de Ferramenta"
        ];
        tags.forEach(text => {
            const span = document.createElement("span");
            span.textContent = text;
            tagsContainer.appendChild(span);
        });

        this.landingPage.appendChild(title);
        this.landingPage.appendChild(subtitle);
        this.landingPage.appendChild(tagsContainer);
    }

    public update(options: VisualUpdateOptions): void {
        this.events.renderingStarted(options);

        try {
            const dataViews = options.dataViews;
            if (!dataViews || !dataViews[0]) {
                this.showLandingPage(true);
                this.events.renderingFinished(options);
                return;
            }

            this.currentDataView = dataViews[0];
            this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
                VisualFormattingSettingsModel,
                dataViews[0]
            );

            this.parsedData = this.parseData(dataViews[0]);

            if (!this.parsedData || this.parsedData.allPoints.length === 0) {
                this.showLandingPage(true);
            } else {
                this.showLandingPage(false);
                this.renderContent();
            }

            this.events.renderingFinished(options);
        } catch (error) {
            console.error("Erro na renderização da Matriz RFV Roos Data Labs:", error);
            this.events.renderingFailed(options, String(error));
        }
    }

    private showLandingPage(show: boolean): void {
        if (show) {
            this.landingPage.style.display = "flex";
            this.clearCards();
        } else {
            this.landingPage.style.display = "none";
        }
    }

    private clearCards(): void {
        const cards = this.container.querySelectorAll(".rfv-multiple-card, .rfv-focused-view");
        cards.forEach(c => c.remove());
        if (this.singleSvg) {
            this.singleSvg.remove();
            this.singleSvg = null;
        }
    }

    private parseData(dataView: DataView): ParsedMatrixData {
        const allPoints: MatrixDataPoint[] = [];
        const groupMap = new Map<string, { totalValue: number; points: MatrixDataPoint[] }>();

        let multiplesIdx = -1;
        let rIdx = -1;
        let fmIdx = -1;
        let valIdx = -1;
        const tooltipColumns: { index: number; displayName: string; format?: string }[] = [];

        if (dataView.table && dataView.table.rows && dataView.table.rows.length > 0) {
            const table = dataView.table;
            const columns = table.columns;

            columns.forEach((col, idx) => {
                const role = col.roles;
                if (role) {
                    if (role["smallMultiples"] || role["cluster"]) multiplesIdx = idx;
                    if (role["recencia"]) rIdx = idx;
                    if (role["frequenciaMonetario"]) fmIdx = idx;
                    if (role["values"]) valIdx = idx;
                    if (role["tooltips"]) {
                        tooltipColumns.push({ index: idx, displayName: col.displayName, format: col.format });
                    }
                }
            });

            // Fallbacks inteligentes
            if (rIdx === -1) {
                rIdx = columns.findIndex(c => c.displayName && c.displayName.toLowerCase().includes("rec"));
            }
            if (fmIdx === -1) {
                fmIdx = columns.findIndex(c => c.displayName && (c.displayName.toLowerCase().includes("freq") || c.displayName.toLowerCase().includes("mon")));
            }
            if (valIdx === -1) {
                valIdx = columns.findIndex(c => c.isMeasure || (c.displayName && (c.displayName.toLowerCase().includes("qtd") || c.displayName.toLowerCase().includes("cliente"))));
            }

            const valColName = (valIdx >= 0 && columns[valIdx] && columns[valIdx].displayName) ? columns[valIdx].displayName : "Quantidade de Clientes";
            const valColFormat = valIdx >= 0 ? columns[valIdx].format : undefined;
            const decOverride = Number(this.formattingSettings.tooltipSettings.decimalPlaces.value ?? -1);

            table.rows.forEach((row, rowIndex) => {
                const rawGroup = multiplesIdx >= 0 ? String(row[multiplesIdx] ?? "") : "";
                const recencia = rIdx >= 0 ? Number(row[rIdx] ?? 0) : 0;
                const frequenciaMonetario = fmIdx >= 0 ? Number(row[fmIdx] ?? 0) : 0;
                const value = valIdx >= 0 ? Number(row[valIdx] ?? 0) : 0;

                const extraTooltips: VisualTooltipDataItem[] = [];
                tooltipColumns.forEach(tCol => {
                    const cellVal = row[tCol.index];
                    if (cellVal !== undefined && cellVal !== null) {
                        const formatted = formatMetricValue(cellVal, tCol.format, decOverride);
                        extraTooltips.push({
                            displayName: tCol.displayName,
                            value: formatted
                        });
                    }
                });

                const selectionId = this.host.createSelectionIdBuilder()
                    .withTable(table, rowIndex)
                    .createSelectionId();

                const qMatch = QUADRANTS.find(q =>
                    q.cells.some(c => c[0] === recencia && c[1] === frequenciaMonetario)
                );
                const color = qMatch ? qMatch.bubbleColor : "#0F59A9";

                if (value > 0 && recencia >= 1 && recencia <= 5 && frequenciaMonetario >= 1 && frequenciaMonetario <= 5) {
                    const dp: MatrixDataPoint = {
                        clusterId: qMatch ? qMatch.id : "cluster",
                        clusterName: qMatch ? qMatch.name : "Cluster",
                        recencia,
                        frequenciaMonetario,
                        value,
                        valueDisplayName: valColName,
                        valueFormat: valColFormat,
                        groupName: rawGroup || undefined,
                        extraTooltips,
                        selectionId,
                        color
                    };

                    allPoints.push(dp);

                    const groupKey = rawGroup || "";
                    if (!groupMap.has(groupKey)) {
                        groupMap.set(groupKey, { totalValue: 0, points: [] });
                    }
                    const entry = groupMap.get(groupKey)!;
                    entry.totalValue += value;
                    entry.points.push(dp);
                }
            });

            const groups: MultiplesGroup[] = [];
            groupMap.forEach((entry, key) => {
                groups.push({
                    groupName: key,
                    totalValue: entry.totalValue,
                    dataPoints: entry.points
                });
            });

            groups.sort((a, b) => b.totalValue - a.totalValue);

            const isMultiples = multiplesIdx >= 0 && (groups.length > 1 || (groups.length === 1 && groups[0].groupName !== ""));
            const globalMaxValue = Math.max(...allPoints.map(p => p.value), 1);

            return {
                groups,
                allPoints,
                globalMaxValue,
                isMultiples,
                valColName,
                valColFormat
            };
        }

        return {
            groups: [],
            allPoints: [],
            globalMaxValue: 1,
            isMultiples: false,
            valColName: "Quantidade de Clientes"
        };
    }

    private renderContent(): void {
        if (!this.parsedData) return;

        this.clearCards();

        if (this.parsedData.isMultiples) {
            if (this.focusedGroupName) {
                const targetGroup = this.parsedData.groups.find(g => g.groupName === this.focusedGroupName);
                if (targetGroup) {
                    this.renderFocusedGroup(targetGroup);
                } else {
                    this.focusedGroupName = null;
                    this.renderSmallMultiples();
                }
            } else {
                this.renderSmallMultiples();
            }
        } else {
            this.focusedGroupName = null;
            this.renderSingleMatrix();
        }

        this.applySelectionStyles();
    }

    private renderSingleMatrix(): void {
        this.container.classList.remove("is-multiples", "has-focus");
        this.container.style.gridTemplateColumns = "";

        const points = this.parsedData?.allPoints || [];
        const globalMax = this.parsedData?.globalMaxValue || 1;

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "tecdisa-rfv-svg");
        svg.setAttribute("viewBox", "0 0 1000 750");
        svg.setAttribute("preserveAspectRatio", "none");
        const isEn = this.getLanguage() === "en-US";
        const isEs = this.getLanguage() === "es-ES";
        svg.setAttribute("aria-label", isEn ? "RFM Matrix" : isEs ? "Matriz RFM" : "Matriz RFV / RFM");

        this.renderMatrixSvg(svg, points, globalMax);
        this.singleSvg = svg;
        this.container.appendChild(svg);
    }

    private renderSmallMultiples(): void {
        this.container.classList.remove("has-focus");
        this.container.classList.add("is-multiples");

        const lang = this.getLanguage();
        const ui = UI_STRINGS_BY_LANG[lang] || UI_STRINGS_BY_LANG["pt-BR"];

        const smSettings = this.formattingSettings.smallMultiplesSettings;
        const cols = Math.max(1, Math.min(4, Number(smSettings.columns.value ?? 2)));
        this.container.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

        const titleSize = Math.max(9, Math.min(24, Number(smSettings.titleFontSize.value ?? 13)));
        const titleColor = smSettings.titleColor.value.value || "#0F172A";
        const showTotal = smSettings.showTotal.value !== false;

        const globalMax = this.parsedData?.globalMaxValue || 1;
        const valFormat = this.parsedData?.valColFormat;
        const decOverride = Number(this.formattingSettings.tooltipSettings.decimalPlaces.value ?? -1);

        // Cálculo dinâmico para exibir no máximo 4 blocos na tela disponível (2 colunas x 2 linhas) e o restante em scroll
        const containerH = this.container.clientHeight || this.target.clientHeight || 550;
        const gap = 16;
        const padding = 12 * 2; // padding vertical do container
        const targetCardHeight = Math.max(260, Math.floor((containerH - padding - gap) / 2));

        this.parsedData?.groups.forEach(group => {
            const card = document.createElement("div");
            card.className = "rfv-multiple-card";
            card.style.height = `${targetCardHeight}px`;
            card.style.minHeight = `${targetCardHeight}px`;

            // Header do card
            const header = document.createElement("div");
            header.className = "rfv-multiple-header";

            // Left: Título
            const headerLeft = document.createElement("div");
            headerLeft.className = "rfv-header-left";

            const title = document.createElement("span");
            title.className = "rfv-multiple-title";
            title.textContent = group.groupName || ui.defaultSegment;
            title.style.fontSize = `${titleSize}px`;
            title.style.color = titleColor;
            title.style.cursor = "pointer";
            title.title = ui.cardTitleTooltip;
            title.addEventListener("click", () => {
                this.focusedGroupName = group.groupName;
                this.renderContent();
            });
            headerLeft.appendChild(title);
            header.appendChild(headerLeft);

            // Right: Badge + Botão de Foco
            const headerRight = document.createElement("div");
            headerRight.className = "rfv-header-right";

            if (showTotal) {
                const badge = document.createElement("span");
                badge.className = "rfv-multiple-badge";
                badge.textContent = `${ui.totalPrefix}${formatMetricValue(group.totalValue, valFormat, decOverride)}`;
                headerRight.appendChild(badge);
            }

            // Botão de Foco / Expandir
            const focusBtn = document.createElement("button");
            focusBtn.className = "rfv-focus-btn";
            focusBtn.title = ui.focusTitle;
            focusBtn.setAttribute("aria-label", ui.focusAria(group.groupName));
            focusBtn.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
                <span>${ui.focusBtn}</span>
            `;
            focusBtn.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                this.focusedGroupName = group.groupName;
                this.renderContent();
            });
            headerRight.appendChild(focusBtn);

            header.appendChild(headerRight);
            card.appendChild(header);

            // Wrap do SVG
            const wrap = document.createElement("div");
            wrap.className = "rfv-multiple-svg-wrap";

            const svgNS = "http://www.w3.org/2000/svg";
            const svg = document.createElementNS(svgNS, "svg");
            svg.setAttribute("viewBox", "0 0 1000 750");
            svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
            svg.setAttribute("role", "img");

            this.renderMatrixSvg(svg, group.dataPoints, globalMax);

            wrap.appendChild(svg);
            card.appendChild(wrap);
            this.container.appendChild(card);
        });
    }

    private renderFocusedGroup(group: MultiplesGroup): void {
        this.container.classList.remove("is-multiples");
        this.container.classList.add("has-focus");
        this.container.style.gridTemplateColumns = "";

        const lang = this.getLanguage();
        const ui = UI_STRINGS_BY_LANG[lang] || UI_STRINGS_BY_LANG["pt-BR"];

        const globalMax = this.parsedData?.globalMaxValue || 1;
        const valFormat = this.parsedData?.valColFormat;
        const decOverride = Number(this.formattingSettings.tooltipSettings.decimalPlaces.value ?? -1);

        const focusedView = document.createElement("div");
        focusedView.className = "rfv-focused-view";

        // Banner superior do modo foco
        const banner = document.createElement("div");
        banner.className = "rfv-focused-banner";

        const leftWrap = document.createElement("div");
        leftWrap.className = "rfv-focused-left";

        const backBtn = document.createElement("button");
        backBtn.className = "rfv-unfocus-btn";
        backBtn.innerHTML = `
            <svg viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            <span>${ui.backBtn}</span>
        `;
        backBtn.title = ui.backBtnTitle;
        backBtn.addEventListener("click", () => {
            this.focusedGroupName = null;
            this.renderContent();
        });
        leftWrap.appendChild(backBtn);

        const title = document.createElement("span");
        title.className = "rfv-focused-title";
        title.textContent = `${ui.focusedTitlePrefix}${group.groupName || ui.focusedDefaultSegment}`;
        leftWrap.appendChild(title);

        banner.appendChild(leftWrap);

        const badge = document.createElement("span");
        badge.className = "rfv-focused-badge";
        badge.textContent = `${ui.totalPrefix}${formatMetricValue(group.totalValue, valFormat, decOverride)}`;
        banner.appendChild(badge);

        focusedView.appendChild(banner);

        // Wrap com SVG 100% de tela
        const svgWrap = document.createElement("div");
        svgWrap.className = "rfv-focused-svg-wrap";

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 1000 750");
        svg.setAttribute("preserveAspectRatio", "none");
        svg.setAttribute("role", "img");

        this.renderMatrixSvg(svg, group.dataPoints, globalMax);
        svgWrap.appendChild(svg);
        focusedView.appendChild(svgWrap);

        this.container.appendChild(focusedView);
    }

    private renderMatrixSvg(svg: SVGSVGElement, dataPoints: MatrixDataPoint[], globalMaxValue: number): void {
        const svgNS = "http://www.w3.org/2000/svg";

        // Defs (Filtro de Sombra)
        const defs = document.createElementNS(svgNS, "defs");
        const filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", "bShadow");
        filter.setAttribute("x", "-20%");
        filter.setAttribute("y", "-20%");
        filter.setAttribute("width", "140%");
        filter.setAttribute("height", "140%");

        const dropShadow = document.createElementNS(svgNS, "feDropShadow");
        dropShadow.setAttribute("dx", "0");
        dropShadow.setAttribute("dy", "2");
        dropShadow.setAttribute("stdDeviation", "2.5");
        dropShadow.setAttribute("flood-color", "#0F172A");
        dropShadow.setAttribute("flood-opacity", "0.3");

        filter.appendChild(dropShadow);
        defs.appendChild(filter);
        svg.appendChild(defs);

        // Click no fundo para desselecionar
        svg.addEventListener("click", () => {
            this.hideCustomTooltip();
            this.host.tooltipService.hide({ isTouchEvent: false, immediately: true });
            this.selectionManager.clear().then(() => {
                this.selectedIds = [];
                this.applySelectionStyles();
            });
        });

        svg.addEventListener("mouseleave", () => {
            this.hideCustomTooltip();
            this.host.tooltipService.hide({ isTouchEvent: false, immediately: true });
        });

        // 1. Quadrantes
        const quadrantsGroup = document.createElementNS(svgNS, "g");
        quadrantsGroup.setAttribute("class", "quadrants-layer");

        const qSettings = this.formattingSettings.quadrantSettings;
        const showQuadrantLabels = qSettings.showLabels.value;
        const opacityPercent = qSettings.opacity.value ?? 75;
        const quadrantFillOpacity = Math.max(0.1, Math.min(1, opacityPercent / 100));

        const lang = this.getLanguage();
        const langNames = QUADRANT_NAMES_BY_LANG[lang] || QUADRANT_NAMES_BY_LANG["pt-BR"];

        QUADRANTS.forEach(q => {
            if (q.shapeType === "rect") {
                const rect = document.createElementNS(svgNS, "rect");
                rect.setAttribute("x", String(q.x));
                rect.setAttribute("y", String(q.y));
                rect.setAttribute("width", String(q.width));
                rect.setAttribute("height", String(q.height));
                rect.setAttribute("fill", q.fill);
                rect.setAttribute("fill-opacity", String(quadrantFillOpacity));
                rect.setAttribute("stroke", q.stroke);
                rect.setAttribute("stroke-width", "1.5");
                if (q.rx) rect.setAttribute("rx", String(q.rx));
                rect.setAttribute("class", "quadrant-bg");
                quadrantsGroup.appendChild(rect);
            } else if (q.shapeType === "path" && q.pathD) {
                const path = document.createElementNS(svgNS, "path");
                path.setAttribute("d", q.pathD);
                path.setAttribute("fill", q.fill);
                path.setAttribute("fill-opacity", String(quadrantFillOpacity));
                path.setAttribute("stroke", q.stroke);
                path.setAttribute("stroke-width", "1.5");
                path.setAttribute("class", "quadrant-bg");
                quadrantsGroup.appendChild(path);
            }

            if (showQuadrantLabels) {
                const text = document.createElementNS(svgNS, "text");
                text.setAttribute("x", String(q.textX));
                text.setAttribute("y", String(q.textY));
                text.setAttribute("class", "cluster-lbl");
                text.setAttribute("fill", q.textColor);
                text.textContent = langNames[q.id] || q.name;
                quadrantsGroup.appendChild(text);
            }
        });
        svg.appendChild(quadrantsGroup);

        // 2. Grade e Eixos
        const gridGroup = document.createElementNS(svgNS, "g");
        gridGroup.setAttribute("class", "grid-layer");

        const gSettings = this.formattingSettings.gridSettings;
        const showGrid = gSettings.showGrid.value;
        const gridColor = gSettings.gridColor.value.value || "#CBD5E1";

        if (showGrid) {
            [200, 400, 600, 800].forEach(x => {
                const line = document.createElementNS(svgNS, "line");
                line.setAttribute("x1", String(x));
                line.setAttribute("y1", "0");
                line.setAttribute("x2", String(x));
                line.setAttribute("y2", "750");
                line.setAttribute("stroke", gridColor);
                line.setAttribute("class", "cell-grid");
                gridGroup.appendChild(line);
            });

            [150, 300, 450, 600].forEach(y => {
                const line = document.createElementNS(svgNS, "line");
                line.setAttribute("x1", "0");
                line.setAttribute("y1", String(y));
                line.setAttribute("x2", "1000");
                line.setAttribute("y2", String(y));
                line.setAttribute("stroke", gridColor);
                line.setAttribute("class", "cell-grid");
                gridGroup.appendChild(line);
            });
        }

        const showAxisLabels = gSettings.showAxisLabels.value;
        const axisLabelColor = gSettings.axisLabelColor.value.value || "#64748B";

        if (showAxisLabels) {
            const xLabels = AXIS_X_BY_LANG[lang] || AXIS_X_BY_LANG["pt-BR"];
            xLabels.forEach(lbl => {
                const t = document.createElementNS(svgNS, "text");
                t.setAttribute("x", String(lbl.x));
                t.setAttribute("y", "742");
                t.setAttribute("class", "axis-lbl");
                t.setAttribute("fill", axisLabelColor);
                t.setAttribute("text-anchor", "middle");
                t.textContent = lbl.text;
                gridGroup.appendChild(t);
            });

            const yLabels = [
                { y: 80, text: "FV 5" },
                { y: 230, text: "FV 4" },
                { y: 380, text: "FV 3" },
                { y: 530, text: "FV 2" },
                { y: 680, text: "FV 1" }
            ];
            yLabels.forEach(lbl => {
                const t = document.createElementNS(svgNS, "text");
                t.setAttribute("x", "990");
                t.setAttribute("y", String(lbl.y));
                t.setAttribute("class", "axis-lbl");
                t.setAttribute("fill", axisLabelColor);
                t.setAttribute("text-anchor", "end");
                t.textContent = lbl.text;
                gridGroup.appendChild(t);
            });
        }
        svg.appendChild(gridGroup);

        // 3. Bolhas
        const bubblesGroup = document.createElementNS(svgNS, "g");
        bubblesGroup.setAttribute("class", "bubbles-layer");

        const bSettings = this.formattingSettings.bubbleSettings;
        const showValues = bSettings.showValues.value;
        const minRadius = Number(bSettings.minRadius.value ?? 14);
        const maxRadius = Number(bSettings.maxRadius.value ?? 44);
        const textColor = bSettings.textColor.value.value || "#FFFFFF";

        dataPoints.forEach(dp => {
            const cx = (dp.recencia - 0.5) * 200;
            const cy = (5 - dp.frequenciaMonetario + 0.5) * 150;

            const ratio = globalMaxValue > 0 ? Math.sqrt(dp.value / globalMaxValue) : 0;
            const r = Math.max(minRadius, Math.min(maxRadius, minRadius + ratio * (maxRadius - minRadius)));

            const g = document.createElementNS(svgNS, "g");
            g.setAttribute("class", "bubble-group");
            g.setAttribute("tabindex", "0");
            g.setAttribute("role", "button");

            (g as unknown as { __dp: MatrixDataPoint }).__dp = dp;

            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", String(cx));
            circle.setAttribute("cy", String(cy));
            circle.setAttribute("r", String(r));
            circle.setAttribute("fill", dp.color);
            circle.setAttribute("stroke", "#FFFFFF");
            circle.setAttribute("stroke-width", "2");
            circle.setAttribute("filter", "url(#bShadow)");
            g.appendChild(circle);

            if (showValues) {
                const text = document.createElementNS(svgNS, "text");
                text.setAttribute("x", String(cx));
                text.setAttribute("y", String(cy));
                text.setAttribute("class", "b-val");
                text.setAttribute("fill", textColor);
                const fontSize = dp.value >= 100 ? 14 : dp.value >= 10 ? 12 : 11;
                text.setAttribute("font-size", `${fontSize}px`);
                text.textContent = dp.value.toLocaleString("pt-BR");
                g.appendChild(text);
            }

            // Cross-Filter Nativo
            const handleSelect = (e: MouseEvent | KeyboardEvent) => {
                const multiSelect = e.ctrlKey || e.metaKey;
                this.selectionManager.select(dp.selectionId, multiSelect).then((selectedIds: ISelectionId[]) => {
                    this.selectedIds = selectedIds || [];
                    this.applySelectionStyles();
                });
            };

            g.addEventListener("click", (e: MouseEvent) => {
                e.stopPropagation();
                handleSelect(e);
            });

            g.addEventListener("keydown", (e: KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(e);
                }
            });

            // Context Menu
            g.addEventListener("contextmenu", (e: MouseEvent) => {
                e.stopPropagation();
                e.preventDefault();
                this.selectionManager.showContextMenu(dp.selectionId, {
                    x: e.clientX,
                    y: e.clientY
                });
            });

            // Tooltips
            g.addEventListener("mousemove", (e: MouseEvent) => {
                const useCustom = this.formattingSettings.tooltipSettings.useCustomTooltip.value !== false;

                if (useCustom) {
                    this.host.tooltipService.hide({ isTouchEvent: false, immediately: true });
                    this.showCustomTooltip(dp, e.clientX, e.clientY);
                } else {
                    this.hideCustomTooltip();
                    if (!this.host.tooltipService.enabled()) return;

                    const curLang = this.getLanguage();
                    const curLangNames = QUADRANT_NAMES_BY_LANG[curLang] || QUADRANT_NAMES_BY_LANG["pt-BR"];
                    const clusterTitle = curLangNames[dp.clusterId] || dp.clusterName;
                    const decOverride = Number(this.formattingSettings.tooltipSettings.decimalPlaces.value ?? -1);

                    const isEn = curLang === "en-US";
                    const isEs = curLang === "es-ES";
                    const lblGroup = isEn ? "Group" : "Grupo";
                    const lblSegment = isEn ? "Segment" : "Segmento";
                    const lblRecency = isEn ? "Recency" : isEs ? "Recencia" : "Recência";
                    const lblFreqVal = isEn ? "Frequency / Value" : isEs ? "Frecuencia / Valor" : "Frequência / Valor";

                    const tooltipItems: VisualTooltipDataItem[] = [];

                    if (dp.groupName) {
                        tooltipItems.push({ displayName: lblGroup, value: dp.groupName });
                    }

                    tooltipItems.push(
                        { displayName: lblSegment, value: clusterTitle },
                        { displayName: dp.valueDisplayName, value: formatMetricValue(dp.value, dp.valueFormat, decOverride) },
                        { displayName: lblRecency, value: `R${dp.recencia}` },
                        { displayName: lblFreqVal, value: `FV${dp.frequenciaMonetario}` }
                    );

                    if (dp.extraTooltips && dp.extraTooltips.length > 0) {
                        dp.extraTooltips.forEach(item => tooltipItems.push(item));
                    }

                    this.host.tooltipService.show({
                        dataItems: tooltipItems,
                        identities: [dp.selectionId],
                        coordinates: [e.clientX, e.clientY],
                        isTouchEvent: false
                    });
                }
            });

            g.addEventListener("mouseleave", () => {
                this.hideCustomTooltip();
                this.host.tooltipService.hide({ isTouchEvent: false, immediately: true });
            });

            bubblesGroup.appendChild(g);
        });

        svg.appendChild(bubblesGroup);
    }

    private applySelectionStyles(): void {
        const hasSelection = this.selectedIds.length > 0;
        const bubbleGroups = this.container.querySelectorAll(".bubble-group");

        bubbleGroups.forEach(group => {
            const dp = (group as unknown as { __dp: MatrixDataPoint }).__dp;
            if (!dp) return;

            const isSelected = hasSelection && this.selectedIds.some(sel => sel.equals(dp.selectionId));

            if (!hasSelection) {
                group.setAttribute("opacity", "1");
            } else if (isSelected) {
                group.setAttribute("opacity", "1");
            } else {
                group.setAttribute("opacity", "0.25");
            }
        });
    }

    private showCustomTooltip(dp: MatrixDataPoint, clientX: number, clientY: number): void {
        clearElement(this.customTooltip);

        const lang = this.getLanguage();
        const ui = UI_STRINGS_BY_LANG[lang] || UI_STRINGS_BY_LANG["pt-BR"];
        const langNames = QUADRANT_NAMES_BY_LANG[lang] || QUADRANT_NAMES_BY_LANG["pt-BR"];
        const clusterTitle = langNames[dp.clusterId] || dp.clusterName;
        const showTag = this.formattingSettings.tooltipSettings.showClusterTag.value !== false;
        const decOverride = Number(this.formattingSettings.tooltipSettings.decimalPlaces.value ?? -1);

        // Header
        const header = document.createElement("div");
        header.className = "tooltip-header";

        const titleWrap = document.createElement("div");
        titleWrap.className = "cluster-title-wrap";

        const dot = document.createElement("span");
        dot.className = "cluster-dot";
        dot.style.backgroundColor = dp.color;
        titleWrap.appendChild(dot);

        const nameSpan = document.createElement("span");
        nameSpan.className = "cluster-name";
        nameSpan.textContent = clusterTitle;
        titleWrap.appendChild(nameSpan);

        header.appendChild(titleWrap);

        if (showTag) {
            const tag = document.createElement("span");
            tag.className = "rfv-tag";
            tag.textContent = `R${dp.recencia} • FV${dp.frequenciaMonetario}`;
            header.appendChild(tag);
        }

        this.customTooltip.appendChild(header);

        // Body
        const body = document.createElement("div");
        body.className = "tooltip-body";

        // Se estiver em modo múltiplos, exibe o nome do grupo destacado
        if (dp.groupName) {
            const groupRow = document.createElement("div");
            groupRow.className = "tooltip-row group-highlight";

            const lblGroup = document.createElement("span");
            lblGroup.className = "row-label";
            lblGroup.textContent = ui.tooltipGroupLabel;

            const valGroup = document.createElement("span");
            valGroup.className = "row-value";
            valGroup.textContent = dp.groupName;

            groupRow.appendChild(lblGroup);
            groupRow.appendChild(valGroup);
            body.appendChild(groupRow);
        }

        // Linha Principal
        const primaryRow = document.createElement("div");
        primaryRow.className = "tooltip-row primary";

        const lblClientes = document.createElement("span");
        lblClientes.className = "row-label";
        lblClientes.textContent = dp.valueDisplayName;

        const valClientes = document.createElement("span");
        valClientes.className = "row-value";
        valClientes.textContent = formatMetricValue(dp.value, dp.valueFormat, decOverride);

        primaryRow.appendChild(lblClientes);
        primaryRow.appendChild(valClientes);
        body.appendChild(primaryRow);

        // Linhas Extras
        if (dp.extraTooltips && dp.extraTooltips.length > 0) {
            dp.extraTooltips.forEach(extra => {
                const row = document.createElement("div");
                row.className = "tooltip-row";

                const lbl = document.createElement("span");
                lbl.className = "row-label";
                lbl.textContent = extra.displayName;

                const val = document.createElement("span");
                val.className = "row-value";
                val.textContent = extra.value;

                row.appendChild(lbl);
                row.appendChild(val);
                body.appendChild(row);
            });
        }

        this.customTooltip.appendChild(body);

        // Posicionamento inteligente em relação ao container
        const rect = this.container.getBoundingClientRect();
        let posX = clientX - rect.left + 14;
        let posY = clientY - rect.top + 14;

        const tooltipWidth = 240;
        const extraCount = (dp.extraTooltips ? dp.extraTooltips.length : 0) + (dp.groupName ? 1 : 0);
        const tooltipHeight = 100 + extraCount * 22;

        if (posX + tooltipWidth > rect.width) {
            posX = clientX - rect.left - tooltipWidth - 14;
        }
        if (posY + tooltipHeight > rect.height) {
            posY = clientY - rect.top - tooltipHeight - 14;
        }

        this.customTooltip.style.left = `${Math.max(8, posX)}px`;
        this.customTooltip.style.top = `${Math.max(8, posY)}px`;
        this.customTooltip.classList.add("visible");
    }

    private hideCustomTooltip(): void {
        this.customTooltip.classList.remove("visible");
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}