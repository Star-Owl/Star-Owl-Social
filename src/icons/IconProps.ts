import { SVGProps } from 'react'

/**
 * Interface `IconProps` extends standard SVG properties with two optional additional properties.
 * It can be used with SVG based icon components.
 *
 * @interface
 * @exports
 * @property {string} className - Optional. A CSS class name that can be used to style the SVG icon component.
 * @property {number} size - Optional. A number that can be used to set the size of the SVG icon component.
 */
export interface IconProps extends SVGProps<SVGSVGElement> {
	className?: string
	size?: number
}
