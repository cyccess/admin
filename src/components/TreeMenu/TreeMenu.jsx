import './index.less'
import { mapChildren } from '../_util/util'
import TreeNodeItem from './TreeNodeItem'

const SubMenu = {
  props: {
    nodes: {
      type: Array,
      default: () => []
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    selectedKeys: {
      type: Array,
      default: () => []
    },
    showIcon: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      treeNodes: this.nodes,
      _openKeys: this.openKeys,
      _selectedKeys: this.selectedKeys
    }
  },
  watch: {
    selectedKeys: {
      handler (selectedKeys) {
        this.$data._selectedKeys = selectedKeys
      },
      deep: true
    }
  },
  provide () {
    return {
      treeMenu: this
    }
  },
  created () {},
  methods: {
    onSelect (e, treeNode) {
      let { _selectedKeys: selectedKeys = [] } = this
      const { eventKey } = treeNode.$props
      selectedKeys = [eventKey]
      console.log(selectedKeys)
      this.$data._selectedKeys = selectedKeys
      this.$emit('update:selectedKeys', selectedKeys)
      this.$emit('select', { eventKey, treeNode })
    },
    onExpand (e, treeNode) {
      const { eventKey } = treeNode.$props
      let { _openKeys: openKeys } = this.$data
      const clone = openKeys.slice()
      const index = clone.indexOf(eventKey)
      if (index > -1) {
        clone.splice(index, 1)
      } else {
        clone.push(eventKey)
      }
      openKeys = clone
      console.log(openKeys)
      this.$data._openKeys = openKeys
      this.$emit('update:openKeys', openKeys)
    },
    rightClick (e, treeNode) {
      this.$emit('rightClick', e, treeNode)
    },
    renderTreeNode (child, index, level = 0) {
      const { _openKeys: openKeys = [], _selectedKeys: selectedKeys = [] } = this.$data
      const key = child.key
      const props = {
        props: {
          treeNode: child,
          level: level,
          eventKey: key,
          expanded: openKeys.indexOf(key) > -1,
          selected: selectedKeys.indexOf(key) > -1,
          showIcon: this.$props.showIcon
        },
        on: {
          select: this.onSelect,
          expand: this.onExpand,
          rightClick: this.rightClick
        },
        scopedSlots: {
          // 作用域插槽，用于自定义标题右边的操作
          action: this.$scopedSlots.action ? props => this.$scopedSlots.action(props) : null
        },
        key
      }

      if (child.children) {
        const pos = level + 1
        return (
          <TreeNodeItem {...props}>
            <ul>{mapChildren(child.children, (node, idx) => this.renderTreeNode(node, idx, pos))}</ul>
          </TreeNodeItem>
        )
      }

      return <TreeNodeItem {...props} />
    }
  },
  render () {
    const { nodes: treeNode } = this.$props
    return (
      <div class="menu-tree">
        <ul>{mapChildren(treeNode, (node, index) => this.renderTreeNode(node, index, 0))}</ul>
      </div>
    )
  }
}

export default SubMenu
