export default (value) => {
  const cleanedValue = value.replace(/\D/g, '')

  // Formatação para CNPJ
  if (cleanedValue.length === 14) {
    return cleanedValue.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
    )
  }

  // Formatação para CPF
  else if (cleanedValue.length === 11) {
    return cleanedValue.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }

  // Retorna o valor original caso não corresponda a CNPJ ou CPF
  return value
}
