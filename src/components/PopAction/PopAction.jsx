import Vue from 'vue'

// function noop () {}

const PopAction = {
  data () {
    return {
      popAction: null
    }
  },
  methods: {
    show (popAction) {
      this.popAction = popAction
    },
    renderActionItem (item) {
      const props = {
        on: {
          click: () => {
            if (typeof item.onClick === 'function') {
              item.onClick()
            }
          }
        }
      }

      return [
        <li {...props}>
          <a href="javascript:;">{item.name}</a>
        </li>,
        item.divider ? <li class="divider" /> : null
      ]
    },
    renderPop () {
      const { style, actions } = this.popAction

      const actionItems = actions.map(item => {
        return this.renderActionItem(item)
      })

      const actionProps = {
        style
      }

      return (
        <div class="pbox" {...actionProps}>
          <div class="pop-menu">
            <ul>{actionItems}</ul>
          </div>
        </div>
      )
    }
  },
  render (h) {
    if (!this.popAction) return null

    return this.renderPop()
  }
}

PopAction.newInstance = function newPopActionInstance (properties, callback) {
  const { style, class: className } = properties

  const div = document.createElement('div')
  document.body.appendChild(div)

  /* eslint-disable no-new */
  new Vue({
    el: div,
    mounted () {
      const self = this
      this.$nextTick(() => {
        const p = {
          action (actionProps) {
            self.$refs.popAction.show(actionProps)
          },
          component: self,
          destroy () {
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }
        }
        callback(p)
      })
    },
    render () {
      const p = {
        style,
        class: className,
        ref: 'popAction'
      }
      return <PopAction {...p} />
    }
  })
}

export default PopAction
