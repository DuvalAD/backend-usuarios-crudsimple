"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_usuario_1 = require("../controllers/controller_usuario");
const router = express_1.Router();
router.get('/', controller_usuario_1.getUsuarios);
router.get('/:id', controller_usuario_1.getUsuario);
router.post('/', controller_usuario_1.postUsuario);
router.put('/:id', controller_usuario_1.putUsuario);
router.delete('/:id', controller_usuario_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=route_usuario.js.map