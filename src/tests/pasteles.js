class Pasteles{
    constructor(){
        this.pedidos = [];
    }

    /**
     * 
     * @param {*} nombreCliente 
     * @param {*} sabor 
     * @param {*} cantidad 
     * @param {*} fechaEntrega 
     * @returns {object} pedido
     * @throws {Error} Faltan detalles del pedido
     * @example 
     * const pedido = pasteles.realizarPedido('Juan Pérez', 'Chocolate', 1, '2023-11-01');
     */
    realizarPedido(nombreCliente, sabor, cantidad, fechaEntrega){
      //check if "pedido" is valid,("cantidad" is not null)) 
      if(cantidad === null)
        throw new Error('Faltan detalles del pedido');

      //Generate random  "pedido" id
      const pedidoId = Math.random().toString(36).substring(7);

      //Create "pedido" object
      const pedido = {
        id: pedidoId,
        nombreCliente,
        sabor,
        cantidad,
        fechaEntrega,
        estado: 'Pendiente'
      };

      this.pedidos.push(pedido);

      return pedido;
    }

    /**
     * 
     * @param {*} pedidoId 
     * @param {*} estado 
     * @returns 
     * @throws {Error} "Pedido no encontrado"
     * @example
     * const pedidoActualizado = pasteles.actualizarEstadoPedido(pedido.id, 'Entregado');
     */
    actualizarEstadoPedido(pedidoId, estado){
      //check if "pedido" exists
      const pedidoActualizado = this.pedidos.filter((pedido) => pedido.id === pedidoId)[0];

      //if "pedido" does not exist, throw error
      if(!pedidoActualizado){
        throw new Error('Pedido no encontrado');
      }
        

      //Update "pedido" status
      pedidoActualizado.estado = estado;
      return pedidoActualizado;
    }

    /**
     * 
     * @returns {array} Get all "pedidos"
     * @example const todosLosPedidos = pasteles.obtenerTodosLosPedidos();
     */
    obtenerTodosLosPedidos(){
      return this.pedidos;
    }
}

module.exports = Pasteles;