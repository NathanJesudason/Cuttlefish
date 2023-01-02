// type definitions used for the 'gantt' package we use, since it wasn't made with typescript in mind
// type definitions come from https://github.com/d-band/gantt

declare module 'gantt' {
  interface Link {
    target: number,
    type: 'FS' | 'FF' | 'SS' | 'SF'
  }
  
  interface Item {
    id: number,
    parent: number,
    text: string,
    start: Date,
    end: Date,
    percent: number,
    links: Array<Link>
  }
  
  type StyleOptions = {
    bgColor?: string,           // default: '#fff'
    lineColor?: string,         // default: '#eee'
    redLineColor?: string,      // default: '#f04134'
    groupBack?: string,         // default: '#3db9d3'
    groupFront?: string,        // default: '#299cb4'
    taskBack?: string,          // default: '#65c16f'
    taskFront?: string,         // default: '#46ad51'
    milestone?: string,         // default: '#d33daf'
    warning?: string,           // default: '#faad14'
    danger?: string,            // default: '#f5222d'
    link?: string,              // default: '#ffa011'
    textColor?: string,         // default: '#222'
    lightTextColor?: string,    // default: '#999'
    lineWidth?: string,         // default: '1px'
    thickLineWidth?: string,    // default: '1.4px'
    fontSize?: string,          // default: '14px'
    smallFontSize?: string,     // default: '12px'
    fontFamily?: string,        // default: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  }
  
  type Options = {
    viewMode: 'day' | 'week' | 'month',
    onClick: (item: Item) => {},
    offsetY?: number,               // default: 60,
    rowHeight?: number,             // default: 40,
    barHeight?: number,             // default: 16,
    thickWidth?: number,            // default: 1.4,
    styleOptions?: StyleOptions
  }
  
  class SVGGantt {
    constructor(element: string | HTMLElement, data: Array<Item>, options: Options);
    setData(data: Array<Item>): void;      // set data and re-render
    setOptions(options: Options): void;    // set options and re-render
    render(): void;
  }
  
  class CanvasGantt {
    constructor(element: string | HTMLElement, data: Array<Item>, options: Options);
    setData(data: Array<Item>): void;      // set data and re-render
    setOptions(options: Options): void;    // set options and re-render
    render(): void;
  }
  
  class StrGantt {
    constructor(data: Array<Item>, options: Options);
    setData(data: Array<Item>): void;
    setOptions(options: Options): void;
    render(): string;
  }
}
