import React from 'react'
import { Box, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import xtype from 'xtypejs'

const Variants = ({ variants, handleSelectedVariant }) => {
    const handleMySelectedVariant = (selected) => {
        const opts = getOptions(selected);
        if (xtype.type(opts) === 'object') {
            for(var key in opts) {
                if(opts.hasOwnProperty(key)) {
                    var value = opts[key];

                    let obj = { }
                    const prop = selected;
                    obj['id'] = selected;
                    obj[prop] = value;

                    handleSelectedVariant(obj);
                }
            }
        };
    };

    const getOptions = (selected) => {
        for (let i = 0; i < variants.length; i++) {
            if (variants[i].id === selected) {
                return variants[i].options;
            };
          }
    };

    return (
        <Box>
            {(xtype.type(variants) === 'array') ? (
                <Box padding='10px'>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                        {variants.map((vrnt) => (
                            <FormControlLabel
                                key={vrnt.id}
                                control={<Radio />}
                                value={vrnt.id}
                                label={vrnt.description} 
                                onClick={() => handleMySelectedVariant(vrnt.id)}
                            />
                        ))}
                    </RadioGroup>
                </Box>
            ) : (
                <React.Fragment />
            )}
        </Box>
    )
}

export default Variants