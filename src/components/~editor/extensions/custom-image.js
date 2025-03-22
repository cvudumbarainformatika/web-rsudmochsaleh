import Image from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/core'

export default Image.extend({
  name: 'custom-image',

  addOptions() {
    return {
      ...Image.options,
      sizes: ['small', 'medium', 'large'],
      pos: ['left', 'middle', 'right']
    }
  },

  addAttributes() {
    return {
      ...Image.config.addAttributes(),
      size: {
        default: 'small',
        parseHTML: element => element.getAttribute('data-size'),
        renderHTML: attributes => {
          if (!attributes.size) {
            return {}
          }
          return {
            'data-size': attributes.size,
            class: `custom-image-${attributes.size}`
          }
        }
      },
      pos: {
        default: 'left',
        parseHTML: element => element.getAttribute('data-pos'),
        renderHTML: attributes => {
          if (!attributes.pos) {
            return {}
          }
          return {
            'data-pos': attributes.pos,
            class: `custom-image-${attributes.pos}`
          }
        }
      }
    }
  },

  // addCommands() {
  //   return {
  //     setImage: (options) => ({ tr, commands }) => {
  //       if (tr.selection?.node?.type?.name === 'custom-image') {
  //         return commands.updateAttributes('custom-image', options)
  //       } else {
  //         return commands.insertContent({
  //           type: this.name,
  //           attrs: options
  //         })
  //       }
  //     }
  //   }
  // },

  addCommands() {
    return {
      // This is unchanged from the original
      // Image setImage function
      // However, if I extended addComands in
      // the same way as addAttributes `this`
      // seemed to lose context, so I've just
      // copied it in here directly
      setImage: (options) => ({ tr, dispatch }) => {
        const { selection } = tr
        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      },
      setSize: (attributes) => ({ tr, dispatch }) => {
        // Check it's a valid size option
        if (!this.options.sizes.includes(attributes.size)) {
          return false
        }

        const { selection } = tr

        // We're calling, for example:
        //
        // editor
        //   .chain()
        //   .focus()
        //   .setSize({ size: 'small' })
        //   .run()
        //
        // from the bubble menu
        // so `attributes` is { size: 'small' }
        // which will add/overwrite the current
        // `selection.node.attrs` attributes
        // including, importantly, `src` :)

        const options = {
          ...selection.node.attrs,
          ...attributes
        }

        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }
      },
      setPos: (attributes) => ({ tr, dispatch }) => {
        // Check it's a valid size option
        if (!this.options.pos.includes(attributes.pos)) {
          return false
        }

        const { selection } = tr

        // We're calling, for example:
        //
        // editor
        //   .chain()
        //   .focus()
        //   .setPos({ pos: 'left' })
        //   .run()
        //
        // from the bubble menu
        // so `attributes` is { size: 'small' }
        // which will add/overwrite the current
        // `selection.node.attrs` attributes
        // including, importantly, `src` :)

        const options = {
          ...selection.node.attrs,
          ...attributes
        }

        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }
      }
    }
  },

  renderHTML({ node, HTMLAttributes }) {
    const { size, pos } = node.attrs
    const classes = []

    if (size) classes.push(`custom-image-${size}`)
    if (pos) classes.push(`custom-image-${pos}`)

    HTMLAttributes.class = classes.join(' ')

    return [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ]
  }

})
