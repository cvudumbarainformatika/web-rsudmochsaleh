// vite

// import _ from 'lodash'

// const globalComponents = import.meta.glob('components/~global/*.vue', { eager: true })

// export default async ({ app }) => {
//   Object.entries(globalComponents).forEach(([path, m]) => {
//     const componentName = _.upperFirst(
//       _.camelCase(path.split('/').pop().replace(/\.\w+$/, ''))
//     )
//     app.component(
//       `${componentName}`, m.default
//     )
//   })
// }

// src/boot/global-components.js
import _ from 'lodash'

export default async ({ app }) => {
  // Hanya daftarkan komponen di klien
  if (!process.env.SERVER) {
    const globalComponents = import.meta.glob('components/~global/*.vue', { eager: true })

    Object.entries(globalComponents).forEach(([path, m]) => {
      const componentName = _.upperFirst(
        _.camelCase(path.split('/').pop().replace(/\.\w+$/, ''))
      )
      app.component(componentName, m.default)
    })
  }
}
