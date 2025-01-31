import * as React from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect } from 'react'

interface SelectAllTransferListProps {
  selected: GridColDef[]
  unselected: GridColDef[]
  updateTable: (selected: GridColDef[], unSelected: GridColDef[]) => void
}

function not(a: readonly GridColDef[], b: readonly GridColDef[]) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a: readonly GridColDef[], b: readonly GridColDef[]) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

function union(a: readonly GridColDef[], b: readonly GridColDef[]) {
  return [...a, ...not(b, a)]
}

export default function SelectAllTransferList({
  selected,
  unselected,
  updateTable,
}: SelectAllTransferListProps) {
  const [checked, setChecked] = React.useState<readonly GridColDef[]>([])
  const [left, setLeft] = React.useState<GridColDef[]>(unselected)
  const [right, setRight] = React.useState<GridColDef[]>(selected)
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  console.log({ left, right })

  useEffect(() => {
    updateTable(right, left)
  }, [left, right, updateTable])

  const handleToggle = (value: GridColDef) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const numberOfChecked = (items: readonly GridColDef[]) =>
    intersection(checked, items).length

  const handleToggleAll = (items: readonly GridColDef[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items))
    } else {
      setChecked(union(checked, items))
    }
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const customList = (title: React.ReactNode, items: readonly GridColDef[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list">
        {items.map((value: GridColDef, index) => {
          const labelId = `transfer-list-all-item-${value}-label`

          return (
            <ListItemButton
              key={index}
              role="listitem"
              onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.headerName}`} />
            </ListItemButton>
          )
        })}
      </List>
    </Card>
  )

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList('Choices', left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right">
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left">
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList('Chosen', right)}</Grid>
    </Grid>
  )
}
