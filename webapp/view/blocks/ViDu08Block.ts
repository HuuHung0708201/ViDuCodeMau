sap.ui.define(["sap/uxap/BlockBase", "sap/m/Text"], function(BlockBase: any, Text: any) {
    "use strict";

    return BlockBase.extend("base.view.blocks.ViDu08Block", {
        renderer: function(oRm: any, oBlock: any) {
            oRm.write("<div");
            oRm.writeControlData(oBlock);
            oRm.write(">");

            const oText = new Text({ text: "Hello from ViDu08Block" });
            oRm.renderControl(oText);

            oRm.write("</div>");
        }
    });
});
