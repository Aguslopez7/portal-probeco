module.exports = {
  printWidth: 180,
  tabWidth: 4,
  trailingComma: 'none',
  singleQuote: true,
  semi: true,
  singleAttributePerLine: true,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',                      // React primero
    '<THIRD_PARTY_MODULES>',        // Luego otras librerías comunes
    '^@components/(.*)$',
    '^@layouts/(.*)$',
    '^@modules/(.*)$',
    '^@context/(.*)$',
    '^@hooks/(.*)$',
    '^@pages/(.*)$',
    '^@router/(.*)$',
    '^@utils/(.*)$',
    '^@services/(.*)$',
    '^[./]',                        // Rutas relativas
    '^@assets/(.*)$',
    '^react-icons.*$',
    '^@styles/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  groupNamespaceSpecifiers: true
};
