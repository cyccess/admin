import './index.less'
import PopAction from './PopAction'

let popActionInstance = null

function getPopActionInstance (className, callback) {
  if (popActionInstance) {
    callback(popActionInstance)
    return
  }
  PopAction.newInstance(
    {
      class: className || 'pop-menu-action'
    },
    action => {
      popActionInstance = action
      callback(action)
    }
  )
}

function action (args) {
  const { actions } = args

  const e = window.event
  const rect = e.currentTarget.getBoundingClientRect()

  const elWidth = e.currentTarget.offsetWidth // 点击元素宽度

  const style = {
    left: rect.left - 230 / 2 + elWidth / 2 + 'px',
    top: rect.top + 30 + 'px'
  }

  getPopActionInstance(args.class, popAction => {
    popAction.action({
      class: args.class,
      style,
      actions
    })
  })

  e.stopPropagation()
}

const api = {
  open: action,
  destroy () {
    if (popActionInstance) {
      popActionInstance.destroy()
      popActionInstance = null
    }
  }
}

document.onclick = function () {
  api.destroy()
}

export default api
