// Aquí se cambian los platos y precios. No hace falta tocar otro archivo.
const restaurante = {
  nombre: "Zarandaja"
};

const menuDelDia = {
  precio: 12,
  entradas: ["Ensalada fresca", "Papa a la huancaína"],
  segundos: ["Lomo saltado", "Ají de gallina", "Arroz con pollo"],
  refresco: "Chicha morada"
};

const categorias = [
  {
    nombre: "Entradas",
    platos: [
      { nombre: "Papa a la huancaína", descripcion: "Papa sancochada con crema de ají amarillo.", precio: 14 },
      { nombre: "Anticuchos", descripcion: "Corazón de res con papas y ají.", precio: 22 }
    ]
  },
  {
    nombre: "Platos de fondo",
    platos: [
      { nombre: "Lomo saltado", descripcion: "Res salteada con cebolla, tomate, papas fritas y arroz.", precio: 32 },
      { nombre: "Ají de gallina", descripcion: "Pollo deshilachado en crema de ají amarillo, con arroz.", precio: 26 },
      { nombre: "Ceviche clásico", descripcion: "Pescado fresco, limón, camote y choclo.", precio: 34 },
      { nombre: "Seco de res", descripcion: "Guiso con culantro, frejoles y arroz.", precio: 28 }
    ]
  },
  {
    nombre: "Bebidas",
    platos: [
      { nombre: "Chicha morada (jarra)", descripcion: "", precio: 16 },
      { nombre: "Limonada frozen", descripcion: "", precio: 10 },
      { nombre: "Gaseosa personal", descripcion: "", precio: 5 }
    ]
  },
 
];