"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const console = (payload, send) => {
    setTimeout(() => {
        send({
            status: payload,
            error: "Error reported",
            message: "Build number 056",
        });
    }, 5000);
};
exports.default = console;
