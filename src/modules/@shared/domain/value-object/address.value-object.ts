import ValueObject from "./value-object.interface";

type AddressProps = {
    street: string;
    number: string;
    zipCode: string;
    city: string;
    state: string;
    complement: string;
}

export default class Address implements ValueObject {
    private _street: string;
    private _number: string;
    private _zipCode: string;
    private _city: string;
    private _state: string;
    private _complement: string;

    constructor(props: AddressProps) {
        this._street = props.street;
        this._number = props.number;
        this._zipCode = props.zipCode;
        this._city = props.city;
        this._state = props.state;
        this._complement = props.complement;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get complement(): string {
        return this._complement;
    }
}