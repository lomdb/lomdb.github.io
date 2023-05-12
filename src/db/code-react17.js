export default {
  js: `import { getVals } from "nano-grid/modules/columns-manager";

function Column({ children, size, addClass, tableElement }) {
  const computedClass = ["nn-column", addClass, getVals(size).class].join(" ");
  const computedStyle = getVals(size).style;
  const computedRole = tableElement ? "cell" : "";
  
  return (
    <div className={computedClass} role={computedRole} style={computedStyle}>
      {children}
    </div>
  );
}

Column.defaultProps = {
  tableElement: false,
  size: ""
}

export default Column;`,
  rowJs: `import { validateSpacing } from "nano-grid/modules/columns-manager";

function Row({ children, addClass, tableElement, group, spacing, breakpoint, vertical }) {
  const cVertical = vertical ? 'nn-vertical' : '';
  const cGroup = group ? 'nn-group' : '';
  const cBreakpoint = breakpoint ? 'nn-' + breakpoint : '';

  const computedClass = [
    "nn-row",
    addClass,
    cBreakpoint,
    validateSpacing(spacing),
    cVertical,
    cGroup,
    ].join(" ");

  let computedRole;
  if ( tableElement ){
    computedRole = "row";
  } else if ( cGroup ) {
    computedRole = "group";
  }
  
  return (
    <div
      className={computedClass}
      role={computedRole}>
      {children}
    </div>
  );
}

Row.defaultProps = {
  tableElement: false,
  vertical: false,
  group: false,
  spacing: 0,
}

export default Row;`,
  install: `import Column from '../components/column';
import Row from '../components/row';`,
  example: `<Row>
  <Column size="3/4">
    75%
  </Column>
  <Column size="1/4">
    25%
  </Column>
</Row>`,
}