import "luna-data-grid/luna-data-grid.css";
import DataGrid from "luna-data-grid";
import { clearData, deleteItem, loadData } from "./CloudStorage";
import { Eruda } from "eruda";
import styles from "./style.css?inline";

interface El {
  html(value: string): El;
  find(selector: string): El;
  on(event: string, selector: string, handler: () => void): El;
  on(event: string, handler: () => void): El;
  off(event: string, selector: string, handler: () => void): El;
  off(event: string, handler: () => void): El;
  get(index: number): HTMLElement;
}

export function CloudStorageDebugger(eruda: Eruda) {
  class _CloudStorageDebugger extends eruda.Tool {
    style: HTMLStyleElement;
    _el: El | undefined;
    _dataGrid: DataGrid | undefined;

    constructor() {
      super();
      this.name = "CloudStorage";
      this.style = eruda.util.evalCss(styles as string);
    }
    init($el: El) {
      super.init($el);
      this._el = $el;
      this._render();
    }

    async _render() {
      if (!this._el) {
        console.error("Element not find");
        return;
      }
      try {
        console.log("Start loading data...");
        const data = await loadData();
        console.log("Data was loaded.");
        const dataRows = Object.entries(data);
        const element = this._el.html(`<div class="cloud-storage-wrapper">
          <div class="cloud-storage-section">
            <h2 class="cloud-storage-title">Cloud Storage
             <div class="btn refresh-storage">
                <span class="icon icon-refresh"></span>
              </div>
              <div class="btn show-detail btn-disabled">
                <span class="icon icon-eye"></span>
              </div>
              <div class="btn copy-storage btn-disabled">
                <span class="icon icon-copy"></span>
              </div>
              <div class="btn delete-storage">
                <span class="icon icon-delete"></span>
              </div>
              <div class="btn clear-storage">
                <span class="icon icon-clear"></span>
              </div>
              <div class="btn filter btn-disabled">
                <span class="icon icon-filter"></span>
              </div>
            </h2>
            <div id="cloud-storage-table"></div>
          </div>
        </div>`);
        const cloudstorageCointainer = element.find("#cloud-storage-table");
        if (!cloudstorageCointainer) {
          throw new Error("Cointainer with cloud-storage-table id not found");
        }
        let selectedNode: any = null;
        element.find(".refresh-storage").on("click", async () => {
          this._render();
          selectedNode = null;
        });
        element.find(".clear-storage").on("click", async () => {
          await clearData();
          this._render();
          selectedNode = null;
        });
        element.find(".delete-storage").on("click", () => {
          const key = selectedNode?.data?.key;
          if (key) {
            selectedNode = null;
            deleteItem(key);
            this._render();
          }
        });
        this._dataGrid = new DataGrid(cloudstorageCointainer.get(0), {
          columns: [
            {
              id: "key",
              title: "Key",
              sortable: true,
            },
            {
              id: "value",
              title: "Value",
            },
          ],
        });
        dataRows.forEach(([key, value]) => {
          this._dataGrid?.append(
            {
              key,
              value,
            },
            {
              selectable: true,
            },
          );
        });
        this._dataGrid?.on("select", (node) => (selectedNode = node));
        this._dataGrid?.on("deselect", () => (selectedNode = null));
        this._dataGrid.container.querySelectorAll("td").forEach((item) => {
          const contentEl = document.createElement("span");
          const tooltipEl = document.createElement("span");
          contentEl.classList.add("content");
          tooltipEl.classList.add("tooltip");
          contentEl.textContent = item.textContent;
          tooltipEl.textContent = item.textContent;
          item.textContent = null;
          item.appendChild(contentEl);
          item.appendChild(tooltipEl);
        });
      } catch (e) {
        console.error("Error load data form Cloud Storage", e);
      }
    }

    show() {
      super.show();
      return this;
    }

    hide() {
      super.hide();
      return this;
    }

    destroy() {
      super.destroy();
      this.style.remove();
    }
  }
  return new _CloudStorageDebugger();
}
