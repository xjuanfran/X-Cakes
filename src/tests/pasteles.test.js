const Pasteles = require('./pasteles');

describe('Sistema de Pedidos de Pasteles', () => {
    let pasteles;

    beforeEach(() => {
        pasteles = new Pasteles();
    });

    test('Realizar un nuevo pedido de pastel', () => {
        const pedido = pasteles.realizarPedido('Juan Pérez', 'Chocolate', 1, '2023-11-01');
        expect(pedido).toBeDefined();
        expect(pedido.estado).toBe('Pendiente');
    });

    test('Actualizar el estado de un pedido', () => {
        const pedido = pasteles.realizarPedido('Ana Rodríguez', 'Vainilla', 2, '2023-11-10');
        const pedidoActualizado = pasteles.actualizarEstadoPedido(pedido.id, 'Entregado');
        expect(pedidoActualizado.estado).toBe('Entregado');
    });

    test('Obtener todos los pedidos', () => {
        pasteles.realizarPedido('Pedro Gómez', 'Fresa', 1, '2023-10-15');
        pasteles.realizarPedido('María López', 'Manzana', 3, '2023-10-20');
        const todosLosPedidos = pasteles.obtenerTodosLosPedidos();
        expect(todosLosPedidos.length).toBe(2);
    });

    test('Realizar un pedido incompleto', () => {
        expect(() => {
            pasteles.realizarPedido('Carlos', 'Chocolate', null, '2023-10-31');
        }).toThrow('Faltan detalles del pedido');
    });

    test('Actualizar el estado de un pedido inexistente', () => {
        expect(() => {
            pasteles.actualizarEstadoPedido(100, 'Entregado');
        }).toThrow('Pedido no encontrado');
    });
});
