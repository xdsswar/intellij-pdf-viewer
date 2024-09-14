// @ts-ignore
import { AppOptions } from "pdf.js/web/app_options";
Object.defineProperty(window, "PDFViewerApplicationOptions", {
  get: () => AppOptions
});
const {PDFViewerApplication} = require("pdf.js/web/app");
import {getViewerConfiguration} from "./support/ViewerConfiguration";
import "pdf.js/web/pdf_print_service";

export class ViewerBootstrapper {
  static defineViewer(): any {
    Object.defineProperty(window, "PDFViewerApplication", {
      get: () => PDFViewerApplication
    });
    AppOptions.set("workerSrc", "pdf.worker.mjs");
    AppOptions.set("cMapUrl", "cmaps/");
    return PDFViewerApplication;
  }

  static load(fileUrl: String | null = null): Promise<void> {
    return new Promise(resolve => {
      AppOptions.set("defaultUrl", fileUrl);
      const config = getViewerConfiguration();
      PDFViewerApplication.initializedPromise.then(function () {
        PDFViewerApplication.eventBus.on("documentloaded", () => resolve());
      });
      // PDFViewerApplication.initialize(config).then()
      PDFViewerApplication.run(config);
    });
  }
}
