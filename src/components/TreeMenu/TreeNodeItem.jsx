export default {
  props: {
    treeNode: {
      type: Object,
      default: Object.assign({})
    },
    level: {
      type: Number,
      default: 0
    },
    expanded: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    // eslint-disable-next-line
    eventKey: [String, Number],
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  inject: {
    treeMenu: { default: () => ({}) }
  },
  methods: {
    onExpand (event) {
      const {
        treeMenu: { onExpand }
      } = this
      onExpand(event, this)
      event.stopPropagation()
    },
    onSelect (event) {
      this.treeMenu.onSelect(event, this)
    },
    rightClick (e) {
      this.treeMenu.rightClick(e, this)
    },
    renderNodeTitle () {
      return (
        <span class="title">
          <span class="title-text">{this.treeNode.name || this.treeNode.title}</span>
          {this.$scopedSlots.action ? (
            this.$scopedSlots.action(this.treeNode)
          ) : (
            <span class="title-action" {...{ on: { click: this.rightClick } }}>
              <a-icon type="down-circle" />
            </span>
          )}
        </span>
      )
    },
    renderNodeItem () {
      const { level, selected, expanded } = this.$props

      const props = {
        class: [{ active: selected }, 'lv' + level],
        on: {
          click: this.onSelect
        }
      }
      return (
        <li>
          <a {...props} href="javascript:;">
            <span onClick={this.onExpand}>
              <a-icon type="caret-right" {...{ class: { 'rotate-caret': expanded } }} />
            </span>
            <span class={this.showIcon ? '' : 'hidden'}>
              <a-icon type="solution" />
            </span>
            {this.renderNodeTitle()}
          </a>
          {this.expanded ? this.$slots.default : null}
        </li>
      )
    }
  },
  render () {
    return this.renderNodeItem()
  }
}
