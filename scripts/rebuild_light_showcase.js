const fs = require('fs');
const path = require('path');

const reportDir = path.join(__dirname, '../showcase/Matriz RFV - Showcase Roos Data Labs.Report');
const showcaseVisualsDir = path.join(reportDir, 'definition/pages/pageShowcase/visuals');
const guiaVisualsDir = path.join(reportDir, 'definition/pages/pageGuia/visuals');

function writeJson(filePath, data) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const content = JSON.stringify(data, null, 2).replace(/\n/g, '\r\n') + '\r\n';
    fs.writeFileSync(filePath, content, 'utf8');
}

// -------------------------------------------------------------------------
// 1. PAGE SHOWCASE (Executive Overview)
// -------------------------------------------------------------------------

// A. Logo RDL
const logoVisual = {
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
  "name": "logoRdlShowcase",
  "position": {
    "x": 60,
    "y": 42,
    "width": 140,
    "height": 48,
    "z": 3000,
    "tabOrder": 3000
  },
  "visual": {
    "visualType": "image",
    "objects": {
      "image": [
        {
          "properties": {
            "sourceFile": {
              "image": {
                "name": { "expr": { "Literal": { "Value": "'rdl_logo_horizontal_cor.png'" } } },
                "url": {
                  "expr": {
                    "ResourcePackageItem": {
                      "PackageName": "RegisteredResources",
                      "PackageType": 1,
                      "ItemName": "rdl_logo_horizontal_cor.png"
                    }
                  }
                },
                "scaling": { "expr": { "Literal": { "Value": "'Fit'" } } }
              }
            }
          }
        }
      ]
    },
    "visualContainerObjects": {
      "background": [
        { "properties": { "show": { "expr": { "Literal": { "Value": "false" } } } } }
      ],
      "border": [
        { "properties": { "show": { "expr": { "Literal": { "Value": "false" } } } } }
      ]
    }
  }
};
writeJson(path.join(showcaseVisualsDir, 'logoRdlShowcase/visual.json'), logoVisual);

// B. Header Title Card (Branco com borda sutil)
const headerTitle = {
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
  "name": "headerTitle",
  "position": {
    "x": 40,
    "y": 30,
    "width": 1840,
    "height": 72,
    "z": 1000,
    "tabOrder": 1000
  },
  "visual": {
    "visualType": "textbox",
    "visualContainerObjects": {
      "background": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
            "transparency": { "expr": { "Literal": { "Value": "0D" } } }
          }
        }
      ],
      "border": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#E2E8F0'" } } } } },
            "radius": { "expr": { "Literal": { "Value": "8D" } } }
          }
        }
      ]
    },
    "objects": {
      "general": [
        {
          "properties": {
            "paragraphs": [
              {
                "textRuns": [
                  {
                    "value": "                                RFM MATRIX · EXECUTIVE SHOWCASE",
                    "textStyle": {
                      "fontWeight": "bold",
                      "fontSize": "13pt",
                      "color": "#1D4ED8"
                    }
                  },
                  {
                    "value": "  |  Roos Data Labs Official Custom Visual · Native Cross-Filtering & Small Multiples",
                    "textStyle": {
                      "fontSize": "9.5pt",
                      "color": "#64748B"
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }
};
writeJson(path.join(showcaseVisualsDir, 'headerTitle/visual.json'), headerTitle);

// C. Botão Ir Para o Guia Técnico
const btnIrParaGuia = {
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
  "name": "btnIrParaGuia",
  "position": {
    "x": 1620,
    "y": 42,
    "width": 240,
    "height": 48,
    "z": 3000,
    "tabOrder": 3000
  },
  "visual": {
    "visualType": "actionButton",
    "visualContainerObjects": {
      "background": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#1D4ED8'" } } } } },
            "transparency": { "expr": { "Literal": { "Value": "0D" } } }
          }
        }
      ],
      "border": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#1E40AF'" } } } } },
            "radius": { "expr": { "Literal": { "Value": "6D" } } }
          }
        }
      ],
      "visualLink": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "type": { "expr": { "Literal": { "Value": "'PageNavigation'" } } },
            "navigationSection": { "expr": { "Literal": { "Value": "'pageGuia'" } } }
          }
        }
      ]
    },
    "objects": {
      "text": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "text": { "expr": { "Literal": { "Value": "'📘 TECHNICAL GUIDE'" } } },
            "fontColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
            "fontSize": { "expr": { "Literal": { "Value": "9.5D" } } },
            "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI Semibold'', sans-serif'" } } },
            "horizontalAlignment": { "expr": { "Literal": { "Value": "'center'" } } }
          }
        }
      ]
    }
  }
};
writeJson(path.join(showcaseVisualsDir, 'btnIrParaGuia/visual.json'), btnIrParaGuia);

// D. Cards de KPI (Clean Light Mode)
function createKpiVisual(name, x, y, width, height, measureName, titleText) {
    return {
      "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
      "name": name,
      "position": {
        "x": x,
        "y": y,
        "width": width,
        "height": height,
        "z": 1000,
        "tabOrder": 1000
      },
      "visual": {
        "visualType": "card",
        "query": {
          "queryState": {
            "Values": {
              "projections": [
                {
                  "field": {
                    "Measure": {
                      "Expression": { "SourceRef": { "Entity": "Medidas" } },
                      "Property": measureName
                    }
                  },
                  "queryRef": `Medidas.${measureName}`,
                  "nativeQueryRef": measureName
                }
              ]
            }
          }
        },
        "objects": {
          "labels": [
            {
              "properties": {
                "color": {
                  "solid": { "color": { "expr": { "Literal": { "Value": "'#0F172A'" } } } }
                },
                "fontSize": { "expr": { "Literal": { "Value": "22D" } } },
                "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI Bold'', sans-serif'" } } }
              }
            }
          ],
          "categoryLabels": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "color": {
                  "solid": { "color": { "expr": { "Literal": { "Value": "'#64748B'" } } } }
                },
                "fontSize": { "expr": { "Literal": { "Value": "9D" } } },
                "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI Semibold'', sans-serif'" } } }
              }
            }
          ]
        },
        "visualContainerObjects": {
          "background": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
                "transparency": { "expr": { "Literal": { "Value": "0D" } } }
              }
            }
          ],
          "border": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#E2E8F0'" } } } } },
                "radius": { "expr": { "Literal": { "Value": "8D" } } }
              }
            }
          ]
        },
        "drillFilterOtherVisuals": true
      }
    };
}

writeJson(path.join(showcaseVisualsDir, 'kpiClientes/visual.json'), createKpiVisual('kpiClientes', 40, 118, 442, 102, 'Qtd Clientes Total', 'ACTIVE CUSTOMERS'));
writeJson(path.join(showcaseVisualsDir, 'kpiFaturamento/visual.json'), createKpiVisual('kpiFaturamento', 506, 118, 442, 102, 'Faturamento Total', 'TOTAL REVENUE'));
writeJson(path.join(showcaseVisualsDir, 'kpiPedidos/visual.json'), createKpiVisual('kpiPedidos', 972, 118, 442, 102, 'Total de Pedidos', 'TOTAL ORDERS'));
writeJson(path.join(showcaseVisualsDir, 'kpiTicket/visual.json'), createKpiVisual('kpiTicket', 1438, 118, 442, 102, 'Ticket Médio', 'AVERAGE TICKET'));

// E. Matriz RFV (Visual Customizado)
const matrizVisualPath = path.join(showcaseVisualsDir, 'matrizVisual/visual.json');
const matrizVisual = JSON.parse(fs.readFileSync(matrizVisualPath, 'utf8'));
matrizVisual.position = {
    "x": 40,
    "y": 236,
    "width": 1050,
    "height": 814,
    "z": 2000,
    "tabOrder": 2000
};
matrizVisual.visual.visualContainerObjects = {
    "background": [
      {
        "properties": {
          "show": { "expr": { "Literal": { "Value": "true" } } },
          "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
          "transparency": { "expr": { "Literal": { "Value": "0D" } } }
        }
      }
    ],
    "border": [
      {
        "properties": {
          "show": { "expr": { "Literal": { "Value": "true" } } },
          "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#E2E8F0'" } } } } },
          "radius": { "expr": { "Literal": { "Value": "8D" } } }
        }
      }
    ]
};
writeJson(matrizVisualPath, matrizVisual);

// F. Tabela de Clientes (Clean Light Mode com Cabeçalho e Grid elegantes)
const tabelaClientes = {
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
  "name": "tabelaClientes",
  "position": {
    "x": 1114,
    "y": 236,
    "width": 766,
    "height": 814,
    "z": 2000,
    "tabOrder": 2000
  },
  "visual": {
    "visualType": "tableEx",
    "query": {
      "queryState": {
        "Values": {
          "projections": [
            {
              "field": { "Column": { "Expression": { "SourceRef": { "Entity": "dClientes" } }, "Property": "Nome Cliente" } },
              "queryRef": "dClientes.Nome Cliente",
              "nativeQueryRef": "Nome Cliente"
            },
            {
              "field": { "Column": { "Expression": { "SourceRef": { "Entity": "dClientes" } }, "Property": "Segmento" } },
              "queryRef": "dClientes.Segmento",
              "nativeQueryRef": "Segmento"
            },
            {
              "field": { "Column": { "Expression": { "SourceRef": { "Entity": "dClientes" } }, "Property": "Cluster" } },
              "queryRef": "dClientes.Cluster",
              "nativeQueryRef": "Cluster"
            },
            {
              "field": { "Column": { "Expression": { "SourceRef": { "Entity": "dClientes" } }, "Property": "Faturamento" } },
              "queryRef": "dClientes.Faturamento",
              "nativeQueryRef": "Faturamento"
            },
            {
              "field": { "Column": { "Expression": { "SourceRef": { "Entity": "dClientes" } }, "Property": "Pedidos" } },
              "queryRef": "dClientes.Pedidos",
              "nativeQueryRef": "Pedidos"
            },
            {
              "field": { "Column": { "Expression": { "SourceRef": { "Entity": "dClientes" } }, "Property": "Dias sem Comprar" } },
              "queryRef": "dClientes.Dias sem Comprar",
              "nativeQueryRef": "Dias sem Comprar"
            }
          ]
        }
      }
    },
    "objects": {
      "columnHeaders": [
        {
          "properties": {
            "fontColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#0F172A'" } } } } },
            "backColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#F1F5F9'" } } } } },
            "fontSize": { "expr": { "Literal": { "Value": "10D" } } },
            "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI Semibold'', sans-serif'" } } }
          }
        }
      ],
      "values": [
        {
          "properties": {
            "fontColorPrimary": { "solid": { "color": { "expr": { "Literal": { "Value": "'#1E293B'" } } } } },
            "backColorPrimary": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
            "fontColorSecondary": { "solid": { "color": { "expr": { "Literal": { "Value": "'#1E293B'" } } } } },
            "backColorSecondary": { "solid": { "color": { "expr": { "Literal": { "Value": "'#F8FAFC'" } } } } },
            "fontSize": { "expr": { "Literal": { "Value": "9.5D" } } },
            "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI'', sans-serif'" } } }
          }
        }
      ],
      "grid": [
        {
          "properties": {
            "gridHorizontal": { "expr": { "Literal": { "Value": "true" } } },
            "gridHorizontalColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#E2E8F0'" } } } } },
            "rowPadding": { "expr": { "Literal": { "Value": "3D" } } }
          }
        }
      ],
      "total": [
        {
          "properties": {
            "totals": { "expr": { "Literal": { "Value": "true" } } },
            "fontColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#0F172A'" } } } } },
            "backColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#F1F5F9'" } } } } },
            "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI Bold'', sans-serif'" } } }
          }
        }
      ]
    },
    "visualContainerObjects": {
      "title": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "text": { "expr": { "Literal": { "Value": "'CLIENTS IN SELECTED SEGMENT'" } } },
            "fontColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#0F172A'" } } } } },
            "fontSize": { "expr": { "Literal": { "Value": "10.5D" } } },
            "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI Bold'', sans-serif'" } } }
          }
        }
      ],
      "background": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
            "transparency": { "expr": { "Literal": { "Value": "0D" } } }
          }
        }
      ],
      "border": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#E2E8F0'" } } } } },
            "radius": { "expr": { "Literal": { "Value": "8D" } } }
          }
        }
      ]
    },
    "drillFilterOtherVisuals": true
  }
};
writeJson(path.join(showcaseVisualsDir, 'tabelaClientes/visual.json'), tabelaClientes);

// -------------------------------------------------------------------------
// 2. PAGE GUIA (Technical Guide)
// -------------------------------------------------------------------------

// A. Logo RDL no Guia
const logoGuia = {
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
  "name": "logoRdlGuia",
  "position": {
    "x": 60,
    "y": 42,
    "width": 140,
    "height": 48,
    "z": 3000,
    "tabOrder": 3000
  },
  "visual": {
    "visualType": "image",
    "objects": {
      "image": [
        {
          "properties": {
            "sourceFile": {
              "image": {
                "name": { "expr": { "Literal": { "Value": "'rdl_logo_horizontal_cor.png'" } } },
                "url": {
                  "expr": {
                    "ResourcePackageItem": {
                      "PackageName": "RegisteredResources",
                      "PackageType": 1,
                      "ItemName": "rdl_logo_horizontal_cor.png"
                    }
                  }
                },
                "scaling": { "expr": { "Literal": { "Value": "'Fit'" } } }
              }
            }
          }
        }
      ]
    },
    "visualContainerObjects": {
      "background": [ { "properties": { "show": { "expr": { "Literal": { "Value": "false" } } } } } ],
      "border": [ { "properties": { "show": { "expr": { "Literal": { "Value": "false" } } } } } ]
    }
  }
};
writeJson(path.join(guiaVisualsDir, 'logoRdlGuia/visual.json'), logoGuia);

// B. Header Guia Title
const headerGuiaTitle = {
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
  "name": "headerGuiaTitle",
  "position": {
    "x": 40,
    "y": 30,
    "width": 1840,
    "height": 72,
    "z": 1000,
    "tabOrder": 1000
  },
  "visual": {
    "visualType": "textbox",
    "visualContainerObjects": {
      "background": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
            "transparency": { "expr": { "Literal": { "Value": "0D" } } }
          }
        }
      ],
      "border": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#E2E8F0'" } } } } },
            "radius": { "expr": { "Literal": { "Value": "8D" } } }
          }
        }
      ]
    },
    "objects": {
      "general": [
        {
          "properties": {
            "paragraphs": [
              {
                "textRuns": [
                  {
                    "value": "                                TECHNICAL IMPLEMENTATION GUIDE · RFM MATRIX",
                    "textStyle": {
                      "fontWeight": "bold",
                      "fontSize": "13pt",
                      "color": "#1D4ED8"
                    }
                  },
                  {
                    "value": "  |  Dimensional modeling, 1:N cross-filtering relationships, and DAX measures",
                    "textStyle": {
                      "fontSize": "9.5pt",
                      "color": "#64748B"
                    }
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }
};
writeJson(path.join(guiaVisualsDir, 'headerGuiaTitle/visual.json'), headerGuiaTitle);

// C. Botão Voltar ao Showcase
const btnVoltarShowcase = {
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
  "name": "btnVoltarShowcase",
  "position": {
    "x": 1620,
    "y": 42,
    "width": 240,
    "height": 48,
    "z": 3000,
    "tabOrder": 3000
  },
  "visual": {
    "visualType": "actionButton",
    "visualContainerObjects": {
      "background": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#1D4ED8'" } } } } },
            "transparency": { "expr": { "Literal": { "Value": "0D" } } }
          }
        }
      ],
      "border": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#1E40AF'" } } } } },
            "radius": { "expr": { "Literal": { "Value": "6D" } } }
          }
        }
      ],
      "visualLink": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "type": { "expr": { "Literal": { "Value": "'PageNavigation'" } } },
            "navigationSection": { "expr": { "Literal": { "Value": "'pageShowcase'" } } }
          }
        }
      ]
    },
    "objects": {
      "text": [
        {
          "properties": {
            "show": { "expr": { "Literal": { "Value": "true" } } },
            "text": { "expr": { "Literal": { "Value": "'← RETURN TO DASHBOARD'" } } },
            "fontColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
            "fontSize": { "expr": { "Literal": { "Value": "9.5D" } } },
            "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI Semibold'', sans-serif'" } } },
            "horizontalAlignment": { "expr": { "Literal": { "Value": "'center'" } } }
          }
        }
      ]
    }
  }
};
writeJson(path.join(guiaVisualsDir, 'btnVoltarShowcase/visual.json'), btnVoltarShowcase);

// D. Botões de Seleção de Idioma (Clean White com borda sutil)
function createLanguageButton(name, bookmarkName, text, x) {
    return {
      "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
      "name": name,
      "position": {
        "x": x,
        "y": 118,
        "width": 170,
        "height": 42,
        "z": 3000,
        "tabOrder": 3000
      },
      "visual": {
        "visualType": "actionButton",
        "visualContainerObjects": {
          "background": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
                "transparency": { "expr": { "Literal": { "Value": "0D" } } }
              }
            }
          ],
          "border": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#CBD5E1'" } } } } },
                "radius": { "expr": { "Literal": { "Value": "6D" } } }
              }
            }
          ],
          "visualLink": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "type": { "expr": { "Literal": { "Value": "'Bookmark'" } } },
                "bookmark": { "expr": { "Literal": { "Value": `'${bookmarkName}'` } } }
              }
            }
          ]
        },
        "objects": {
          "text": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "text": { "expr": { "Literal": { "Value": `'${text}'` } } },
                "fontColor": { "solid": { "color": { "expr": { "Literal": { "Value": "'#0F172A'" } } } } },
                "fontSize": { "expr": { "Literal": { "Value": "10D" } } },
                "fontFamily": { "expr": { "Literal": { "Value": "'''Segoe UI Semibold'', sans-serif'" } } },
                "horizontalAlignment": { "expr": { "Literal": { "Value": "'center'" } } }
              }
            }
          ]
        }
      }
    };
}

writeJson(path.join(guiaVisualsDir, 'btnIdiomaPT/visual.json'), createLanguageButton('btnIdiomaPT', 'bmIdiomaPT', '🇧🇷 Português', 1330));
writeJson(path.join(guiaVisualsDir, 'btnIdiomaEN/visual.json'), createLanguageButton('btnIdiomaEN', 'bmIdiomaEN', '🇺🇸 English', 1515));
writeJson(path.join(guiaVisualsDir, 'btnIdiomaES/visual.json'), createLanguageButton('btnIdiomaES', 'bmIdiomaES', '🇪🇸 Español', 1700));

// E. 3 Cards de Conteúdo nos 3 Idiomas (Light Mode Ultra-Premium)
function createCardBox(name, groupName, x, paragraphs) {
    return {
      "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.13.0/schema.json",
      "name": name,
      "position": {
        "x": x,
        "y": 176,
        "width": 590,
        "height": 874,
        "z": 1000,
        "tabOrder": 1000
      },
      "visual": {
        "visualType": "textbox",
        "visualContainerObjects": {
          "background": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#FFFFFF'" } } } } },
                "transparency": { "expr": { "Literal": { "Value": "0D" } } }
              }
            }
          ],
          "border": [
            {
              "properties": {
                "show": { "expr": { "Literal": { "Value": "true" } } },
                "color": { "solid": { "color": { "expr": { "Literal": { "Value": "'#E2E8F0'" } } } } },
                "radius": { "expr": { "Literal": { "Value": "8D" } } }
              }
            }
          ]
        },
        "objects": {
          "general": [
            {
              "properties": {
                "paragraphs": paragraphs
              }
            }
          ]
        }
      },
      "parentGroupName": groupName
    };
}

// TEXTOS EM PORTUGUÊS
const card1PT = createCardBox('card1PT', 'grpIdiomaPT', 40, [
  { textRuns: [{ value: "1. CONSTRUÇÃO DA TABELA #MatrizRFM", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\nO visual necessita de uma tabela dimensional com as 25 células da matriz (5x5). Cada linha representa uma coordenada de Recência e Frequência/Valor.", textStyle: { fontSize: "9.5pt", color: "#334155" } }] },
  { textRuns: [{ value: "\n\nColunas Obrigatórias:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Recencia (1 a 5): Eixo X da matriz\n• Frequencia/Monetario (1 a 5): Eixo Y da matriz\n• ChaveRFM (int64): Recencia * 10 + [Frequencia/Monetario]\n• Descricao (Texto): Nome do cluster (ex: Campeões, Em Risco)\n• Descricao EN / Descricao ES: Nomes traduzidos para modelos globais\n• Ordem (int64): Ordenação lógica das classes", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\nCódigo Power Query (M) Pronto:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\nlet\n    Fonte = Table.FromRows({\n        {5, 5, 55, \"Campeões\", \"Champions\", \"Campeones\", 11},\n        {4, 5, 45, \"Clientes Leais\", \"Loyal Customers\", \"Clientes Leales\", 10},\n        ...\n        {1, 1, 11, \"Perdidos\", \"Lost\", \"Perdidos\", 1}\n    }, type table [Recencia=Int64.Type, #\"Frequencia/Monetario\"=Int64.Type, ...])\nin\n    Fonte", textStyle: { fontSize: "8.5pt", color: "#0F172A", fontFamily: "'Consolas', monospace" } }] },
  { textRuns: [{ value: "\n\n💡 Dica:", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#EA580C" } }, { value: " Você pode criar essa tabela via DAX com DATATABLE() ou diretamente no Power Query.", textStyle: { fontSize: "9pt", color: "#475569" } }] }
]);

const card2PT = createCardBox('card2PT', 'grpIdiomaPT', 655, [
  { textRuns: [{ value: "2. RELACIONAMENTO & FILTRO CRUZADO", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\nPor que o clique na matriz não filtrava a tabela antes?", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#EA580C" } }] },
  { textRuns: [{ value: "\nPara que a seleção de uma bolha na Matriz filtre seus clientes, tabelas e KPIs, as duas tabelas DEVEM estar conectadas por um relacionamento no Modelo Semântico.", textStyle: { fontSize: "9.5pt", color: "#334155" } }] },
  { textRuns: [{ value: "\n\nPasso a Passo da Configuração:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n1. Na sua tabela de Clientes (ou Fato de Vendas), crie a coluna ChaveRFM:\n   ChaveRFM = dClientes[Recencia] * 10 + dClientes[Frequencia/Monetario]", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n2. Na Exibição de Modelo do Power BI, arraste a coluna ChaveRFM da tabela dClientes para a ChaveRFM da #MatrizRFM.", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n3. Cardinalidade: Muitos para Um (*:1)", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n   • dClientes (Muitos / *) -> #MatrizRFM (Um / 1 chave única)", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n4. Direção do Filtro Cruzado: Ambas (Both Directions)", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n   Com filtro bidirecional ativado, selecionar qualquer quadrante ou bolha filtra imediatamente a tabela de clientes e os 4 KPIs no topo!", textStyle: { fontSize: "9pt", color: "#16A34A", fontWeight: "600" } }] }
]);

const card3PT = createCardBox('card3PT', 'grpIdiomaPT', 1270, [
  { textRuns: [{ value: "3. MEDIDAS DAX & RECURSOS AVANÇADOS", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\nMedidas DAX Recomendadas:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Quantidade de Clientes:\n   Qtd Clientes = COUNTROWS(dClientes)\n\n• Faturamento Total:\n   Faturamento Total = SUM(dClientes[Faturamento])\n\n• Ticket Médio:\n   Ticket Médio = DIVIDE([Faturamento Total], [Total de Pedidos])", textStyle: { fontSize: "8.5pt", color: "#0F172A", fontFamily: "'Consolas', monospace" } }] },
  { textRuns: [{ value: "\n\nMapeamento dos Campos no Visual:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Recência (Eixo X): #MatrizRFM[Recencia]\n• Frequência / Valor (Eixo Y): #MatrizRFM[Frequencia/Monetario]\n• Valores (Métrica): [Qtd Clientes]\n• Dicas de Ferramenta: [Faturamento Total], [Ticket Médio]\n• Múltiplos Pequenos (Opcional): dClientes[Segmento]", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\nRecursos Exclusivos Roos Data Labs:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n• Small Multiples nativo com escala global de bolhas\n• Botão de Foco para expandir e cobrir todo o espaço\n• Tooltip estilizado escuro ultra-premium ou tooltip nativo\n• Seletor de idioma nos quadrantes (PT, EN, ES)", textStyle: { fontSize: "9pt", color: "#334155" } }] }
]);

writeJson(path.join(guiaVisualsDir, 'card1PT/visual.json'), card1PT);
writeJson(path.join(guiaVisualsDir, 'card2PT/visual.json'), card2PT);
writeJson(path.join(guiaVisualsDir, 'card3PT/visual.json'), card3PT);

// TEXTOS EM INGLÊS
const card1EN = createCardBox('card1EN', 'grpIdiomaEN', 40, [
  { textRuns: [{ value: "1. BUILDING THE #MatrizRFM TABLE", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\nThe visual requires a dimension table representing the 25 matrix cells (5x5). Each row corresponds to a Recency and Frequency/Monetary score.", textStyle: { fontSize: "9.5pt", color: "#334155" } }] },
  { textRuns: [{ value: "\n\nRequired Columns:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Recencia (1 to 5): X-Axis position\n• Frequencia/Monetario (1 to 5): Y-Axis position\n• ChaveRFM (int64): Recencia * 10 + [Frequencia/Monetario]\n• Descricao (Text): Cluster name (e.g. Champions, At Risk)\n• Descricao EN / Descricao ES: Multi-language descriptions\n• Ordem (int64): Logical sort order", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\nPower Query (M) Code Snippet:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\nlet\n    Source = Table.FromRows({\n        {5, 5, 55, \"Champions\", \"Champions\", \"Campeones\", 11},\n        {4, 5, 45, \"Loyal Customers\", \"Loyal Customers\", \"Clientes Leales\", 10},\n        ...\n        {1, 1, 11, \"Lost\", \"Lost\", \"Perdidos\", 1}\n    }, type table [Recencia=Int64.Type, #\"Frequencia/Monetario\"=Int64.Type, ...])\nin\n    Source", textStyle: { fontSize: "8.5pt", color: "#0F172A", fontFamily: "'Consolas', monospace" } }] },
  { textRuns: [{ value: "\n\n💡 Pro Tip:", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#EA580C" } }, { value: " You can also generate this table via DAX using DATATABLE().", textStyle: { fontSize: "9pt", color: "#475569" } }] }
]);

const card2EN = createCardBox('card2EN', 'grpIdiomaEN', 655, [
  { textRuns: [{ value: "2. RELATIONSHIP & CROSS-FILTERING", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\nWhy didn't bubble clicks filter the customer table before?", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#EA580C" } }] },
  { textRuns: [{ value: "\nFor matrix bubble selection to filter your customer table, cards, and charts, both tables MUST be linked by a relationship in the Semantic Model.", textStyle: { fontSize: "9.5pt", color: "#334155" } }] },
  { textRuns: [{ value: "\n\nStep-by-Step Setup:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n1. In your Customers (or Sales Fact) table, create the key column:\n   ChaveRFM = dClientes[Recencia] * 10 + dClientes[Frequencia/Monetario]", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n2. In Power BI Model View, drag ChaveRFM from dClientes to #MatrizRFM[ChaveRFM].", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n3. Cardinality: Many to One (*:1)", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n   • dClientes (Many / *) -> #MatrizRFM (One / 1 unique key)", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n4. Cross-Filter Direction: Both", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n   With bidirectional filtering active, selecting any bubble or quadrant instantly filters your client list and executive KPIs!", textStyle: { fontSize: "9pt", color: "#16A34A", fontWeight: "600" } }] }
]);

const card3EN = createCardBox('card3EN', 'grpIdiomaEN', 1270, [
  { textRuns: [{ value: "3. DAX MEASURES & ADVANCED CAPABILITIES", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\nRecommended DAX Measures:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Customer Count:\n   Customer Count = COUNTROWS(dClientes)\n\n• Total Revenue:\n   Total Revenue = SUM(dClientes[Faturamento])\n\n• Average Ticket:\n   Average Ticket = DIVIDE([Total Revenue], [Total Orders])", textStyle: { fontSize: "8.5pt", color: "#0F172A", fontFamily: "'Consolas', monospace" } }] },
  { textRuns: [{ value: "\n\nVisual Field Mapping:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Recency (X-Axis): #MatrizRFM[Recencia]\n• Frequency / Monetary (Y-Axis): #MatrizRFM[Frequencia/Monetario]\n• Values (Metric): [Customer Count]\n• Tooltips: [Total Revenue], [Average Ticket]\n• Small Multiples (Optional): dClientes[Segmento]", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\nExclusive Roos Data Labs Features:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n• Native Small Multiples with unified global bubble scaling\n• Focus Mode button to expand and fill visual canvas\n• Ultra-premium dark tooltip with custom metrics & formats\n• 3-language labels switchable in the Format Pane (PT, EN, ES)", textStyle: { fontSize: "9pt", color: "#334155" } }] }
]);

writeJson(path.join(guiaVisualsDir, 'card1EN/visual.json'), card1EN);
writeJson(path.join(guiaVisualsDir, 'card2EN/visual.json'), card2EN);
writeJson(path.join(guiaVisualsDir, 'card3EN/visual.json'), card3EN);

// TEXTOS EM ESPANHOL
const card1ES = createCardBox('card1ES', 'grpIdiomaES', 40, [
  { textRuns: [{ value: "1. CONSTRUCCIÓN DE LA TABLA #MatrizRFM", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\nEl visual requiere una tabla dimensional con las 25 celdas de la matriz (5x5). Cada fila representa una coordenada de Recencia y Frecuencia/Valor.", textStyle: { fontSize: "9.5pt", color: "#334155" } }] },
  { textRuns: [{ value: "\n\nColumnas Requeridas:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Recencia (1 a 5): Eje X de la matriz\n• Frequencia/Monetario (1 a 5): Eje Y de la matriz\n• ChaveRFM (int64): Recencia * 10 + [Frequencia/Monetario]\n• Descricao (Texto): Nombre del cluster (ej: Campeones, En Riesgo)\n• Descricao EN / Descricao ES: Nombres traducidos\n• Ordem (int64): Orden lógico de las clases", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\nCódigo Power Query (M) Listo:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\nlet\n    Fuente = Table.FromRows({\n        {5, 5, 55, \"Campeones\", \"Champions\", \"Campeones\", 11},\n        {4, 5, 45, \"Clientes Leales\", \"Loyal Customers\", \"Clientes Leales\", 10},\n        ...\n        {1, 1, 11, \"Perdidos\", \"Lost\", \"Perdidos\", 1}\n    }, type table [Recencia=Int64.Type, #\"Frequencia/Monetario\"=Int64.Type, ...])\nin\n    Fuente", textStyle: { fontSize: "8.5pt", color: "#0F172A", fontFamily: "'Consolas', monospace" } }] },
  { textRuns: [{ value: "\n\n💡 Sugerencia:", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#EA580C" } }, { value: " También puedes crear esta tabla en DAX con DATATABLE().", textStyle: { fontSize: "9pt", color: "#475569" } }] }
]);

const card2ES = createCardBox('card2ES', 'grpIdiomaES', 655, [
  { textRuns: [{ value: "2. RELACIÓN & FILTRO CRUZADO", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n¿Por qué el clic en la matriz no filtraba la tabla antes?", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#EA580C" } }] },
  { textRuns: [{ value: "\nPara que la selección de una burbuja en la matriz filtre tus clientes, tablas y KPIs, ambas tablas DEBEN estar conectadas en el Modelo Semántico.", textStyle: { fontSize: "9.5pt", color: "#334155" } }] },
  { textRuns: [{ value: "\n\nPaso a Paso de la Configuración:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n1. En tu tabla de Clientes, crea la columna ChaveRFM:\n   ChaveRFM = dClientes[Recencia] * 10 + dClientes[Frequencia/Monetario]", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n2. En la Vista de Modelo de Power BI, arrastra ChaveRFM desde dClientes a #MatrizRFM[ChaveRFM].", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n3. Cardinalidad: Varios a Uno (*:1)", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n   • dClientes (Varios / *) -> #MatrizRFM (Uno / 1 clave única)", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\n4. Dirección del Filtro Cruzado: Ambas (Both)", textStyle: { fontWeight: "bold", fontSize: "9.5pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n   Con el filtro bidireccional activo, seleccionar cualquier cuadrante o burbuja filtra instantáneamente tu tabla de clientes y KPIs!", textStyle: { fontSize: "9pt", color: "#16A34A", fontWeight: "600" } }] }
]);

const card3ES = createCardBox('card3ES', 'grpIdiomaES', 1270, [
  { textRuns: [{ value: "3. MEDIDAS DAX & CARACTERÍSTICAS AVANZADAS", textStyle: { fontWeight: "bold", fontSize: "12pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\nMedidas DAX Recomendadas:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Cantidad de Clientes:\n   Cant Clientes = COUNTROWS(dClientes)\n\n• Facturación Total:\n   Facturacion Total = SUM(dClientes[Faturamento])\n\n• Ticket Promedio:\n   Ticket Promedio = DIVIDE([Facturacion Total], [Total Pedidos])", textStyle: { fontSize: "8.5pt", color: "#0F172A", fontFamily: "'Consolas', monospace" } }] },
  { textRuns: [{ value: "\n\nMapeo de Campos en el Visual:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#0F172A" } }] },
  { textRuns: [{ value: "\n• Recencia (Eje X): #MatrizRFM[Recencia]\n• Frecuencia / Monetario (Eje Y): #MatrizRFM[Frequencia/Monetario]\n• Valores (Métrica): [Cant Clientes]\n• Dicas de Herramienta: [Facturacion Total], [Ticket Promedio]\n• Múltiplos Pequeños (Opcional): dClientes[Segmento]", textStyle: { fontSize: "9pt", color: "#475569" } }] },
  { textRuns: [{ value: "\n\nRecursos Exclusivos Roos Data Labs:", textStyle: { fontWeight: "bold", fontSize: "10pt", color: "#1D4ED8" } }] },
  { textRuns: [{ value: "\n• Small Multiples nativo con escala global de burbujas\n• Botón de Enfoque para expandir y cubrir todo el espacio\n• Tooltip estilizado oscuro ultra-premium con formato real\n• Selector de idioma en cuadrantes (PT, EN, ES)", textStyle: { fontSize: "9pt", color: "#334155" } }] }
]);

writeJson(path.join(guiaVisualsDir, 'card1ES/visual.json'), card1ES);
writeJson(path.join(guiaVisualsDir, 'card2ES/visual.json'), card2ES);
writeJson(path.join(guiaVisualsDir, 'card3ES/visual.json'), card3ES);

console.log('Sucesso! Showcase completamente reconstruido na versao LIGHT.');
