import { Identifier } from './identifier'
import { Variant } from '../variant'

export class TableIdentifier extends Identifier {
  public override variant: Variant = 'table'
  constructor(text: string) {
    super(text)
  }
}
