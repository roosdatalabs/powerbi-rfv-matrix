"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

/**
 * Configurações de Múltiplos Pequenos (Small Multiples)
 */
export class SmallMultiplesSettingsCard extends FormattingSettingsCard {
    columns = new formattingSettings.NumUpDown({
        name: "columns",
        displayName: "Colunas por Linha",
        value: 2
    });

    titleFontSize = new formattingSettings.NumUpDown({
        name: "titleFontSize",
        displayName: "Tamanho do Título",
        value: 13
    });

    titleColor = new formattingSettings.ColorPicker({
        name: "titleColor",
        displayName: "Cor do Título",
        value: { value: "#0F172A" }
    });

    showTotal = new formattingSettings.ToggleSwitch({
        name: "showTotal",
        displayName: "Exibir Total do Grupo",
        value: true
    });

    name: string = "smallMultiplesSettings";
    displayName: string = "Múltiplos Pequenos";
    slices: Array<FormattingSettingsSlice> = [this.columns, this.titleFontSize, this.titleColor, this.showTotal];
}

/**
 * Configurações dos Quadrantes da Matriz
 */
export class QuadrantSettingsCard extends FormattingSettingsCard {
    language = new formattingSettings.AutoDropdown({
        name: "language",
        displayName: "Idioma dos Rótulos",
        value: "pt-BR"
    });

    showLabels = new formattingSettings.ToggleSwitch({
        name: "showLabels",
        displayName: "Exibir Nomes dos Segmentos",
        value: true
    });

    opacity = new formattingSettings.NumUpDown({
        name: "opacity",
        displayName: "Opacidade do Fundo (%)",
        value: 75
    });

    name: string = "quadrantSettings";
    displayName: string = "Quadrantes";
    slices: Array<FormattingSettingsSlice> = [this.language, this.showLabels, this.opacity];
}

/**
 * Configurações das Bolhas de Dados
 */
export class BubbleSettingsCard extends FormattingSettingsCard {
    showValues = new formattingSettings.ToggleSwitch({
        name: "showValues",
        displayName: "Exibir Valores",
        value: true
    });

    minRadius = new formattingSettings.NumUpDown({
        name: "minRadius",
        displayName: "Tamanho Mínimo (px)",
        value: 14
    });

    maxRadius = new formattingSettings.NumUpDown({
        name: "maxRadius",
        displayName: "Tamanho Máximo (px)",
        value: 44
    });

    textColor = new formattingSettings.ColorPicker({
        name: "textColor",
        displayName: "Cor do Texto",
        value: { value: "#FFFFFF" }
    });

    name: string = "bubbleSettings";
    displayName: string = "Bolhas de Dados";
    slices: Array<FormattingSettingsSlice> = [this.showValues, this.minRadius, this.maxRadius, this.textColor];
}

/**
 * Configurações da Grade e Eixos
 */
export class GridSettingsCard extends FormattingSettingsCard {
    showGrid = new formattingSettings.ToggleSwitch({
        name: "showGrid",
        displayName: "Exibir Linhas de Grade",
        value: true
    });

    gridColor = new formattingSettings.ColorPicker({
        name: "gridColor",
        displayName: "Cor da Grade",
        value: { value: "#CBD5E1" }
    });

    showAxisLabels = new formattingSettings.ToggleSwitch({
        name: "showAxisLabels",
        displayName: "Exibir Rótulos dos Eixos",
        value: true
    });

    axisLabelColor = new formattingSettings.ColorPicker({
        name: "axisLabelColor",
        displayName: "Cor dos Rótulos",
        value: { value: "#64748B" }
    });

    name: string = "gridSettings";
    displayName: string = "Eixos e Grade";
    slices: Array<FormattingSettingsSlice> = [this.showGrid, this.gridColor, this.showAxisLabels, this.axisLabelColor];
}

/**
 * Configurações do Tooltip do Visual
 */
export class TooltipSettingsCard extends FormattingSettingsCard {
    useCustomTooltip = new formattingSettings.ToggleSwitch({
        name: "useCustomTooltip",
        displayName: "Tooltip Estilizado do Visual",
        value: true
    });

    showClusterTag = new formattingSettings.ToggleSwitch({
        name: "showClusterTag",
        displayName: "Exibir Tag do Segmento",
        value: true
    });

    decimalPlaces = new formattingSettings.NumUpDown({
        name: "decimalPlaces",
        displayName: "Casas Decimais (-1 = Auto)",
        value: -1
    });

    name: string = "tooltipSettings";
    displayName: string = "Dica de Ferramenta do Visual";
    slices: Array<FormattingSettingsSlice> = [this.useCustomTooltip, this.showClusterTag, this.decimalPlaces];
}

/**
 * Modelo Completo de Formatação da Matriz RFV
 */
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    smallMultiplesSettings = new SmallMultiplesSettingsCard();
    quadrantSettings = new QuadrantSettingsCard();
    bubbleSettings = new BubbleSettingsCard();
    gridSettings = new GridSettingsCard();
    tooltipSettings = new TooltipSettingsCard();

    cards = [this.smallMultiplesSettings, this.quadrantSettings, this.bubbleSettings, this.gridSettings, this.tooltipSettings];
}
